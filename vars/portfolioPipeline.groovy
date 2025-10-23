@Library('pipeline-helpers') _

def call() {
    pipeline {
        agent any
        
        options {
            buildDiscarder(logRotator(numToKeepStr: '10'))
            timeout(time: 30, unit: 'MINUTES')
            timestamps()
        }
        
        environment {
            DOCKER_COMPOSE_FILE = 'docker-compose.yml'
            GIT_REPO = 'https://github.com/Shrinidhi972004/personal-portfolio.git'
            PROJECT_NAME = 'shrinidhi-portfolio'
            NODE_VERSION = '18'
        }
        
        stages {
            stage('Clean Up') {
                steps {
                    script {
                        try {
                            pipelineHelpers.cleanupWorkspace()
                        } catch (Exception e) {
                            echo "Cleanup warning: ${e.getMessage()}"
                        }
                    }
                }
            }
            
            stage('Git Clone') {
                steps {
                    script {
                        pipelineHelpers.cloneRepository()
                    }
                }
            }
            
            stage('Build') {
                steps {
                    script {
                        pipelineHelpers.buildApplication()
                    }
                }
            }
            
            stage('Docker Compose Build') {
                steps {
                    script {
                        pipelineHelpers.dockerComposeBuild()
                    }
                }
            }
            
            stage('Docker Compose Up') {
                steps {
                    script {
                        pipelineHelpers.dockerComposeUp()
                    }
                }
            }
            
            stage('Health Check') {
                steps {
                    script {
                        sh '''
                            echo "Performing health check..."
                            for i in {1..5}; do
                                if curl -f http://localhost:6969; then
                                    echo "Health check passed"
                                    exit 0
                                fi
                                echo "Attempt $i failed, retrying in 5 seconds..."
                                sleep 5
                            done
                            echo "Health check failed after 5 attempts"
                            exit 1
                        '''
                    }
                }
            }
        }
        
        post {
            always {
                script {
                    sh 'docker-compose logs || true'
                }
            }
            success {
                echo '✅ Portfolio deployed successfully!'
                echo '🌐 Access your portfolio at: http://localhost:6969'
            }
            failure {
                echo '❌ Pipeline failed. Rolling back...'
                script {
                    sh 'docker-compose down || true'
                }
            }
        }
    }
}
