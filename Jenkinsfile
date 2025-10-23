pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        GIT_REPO = 'https://github.com/Shrinidhi972004/personal-portfolio.git'
        PROJECT_NAME = 'shrinidhi-portfolio'
    }
    
    stages {
        stage('Clean Up') {
            steps {
                script {
                    cleanupWorkspace()
                }
            }
        }
        
        stage('Git Clone') {
            steps {
                script {
                    cloneRepository()
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    buildApplication()
                }
            }
        }
        
        stage('Docker Compose Build') {
            steps {
                script {
                    dockerComposeBuild()
                }
            }
        }
        
        stage('Docker Compose Up') {
            steps {
                script {
                    dockerComposeUp()
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed'
        }
        success {
            echo 'Portfolio deployed successfully on port 6969'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
