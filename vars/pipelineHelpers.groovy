def cleanupWorkspace() {
    echo 'Starting cleanup process...'
    
    sh '''
        echo "Stopping existing containers..."
        docker-compose -f docker-compose.yml down --remove-orphans || true
        
        echo "Removing existing containers..."
        docker container prune -f || true
        
        echo "Removing unused images..."
        docker image prune -f || true
        
        echo "Cleaning workspace..."
        rm -rf * .* 2>/dev/null || true
        
        echo "Cleanup completed successfully"
    '''
}

def cloneRepository() {
    echo 'Cloning repository...'
    
    sh '''
        echo "Cloning from: ${GIT_REPO}"
        git clone ${GIT_REPO} .
        
        echo "Repository cloned successfully"
        ls -la
    '''
}

def buildApplication() {
    echo 'Building React application...'
    
    sh '''
        echo "Installing Node.js dependencies..."
        npm install
        
        echo "Building production bundle..."
        npm run build
        
        echo "Build completed successfully"
        ls -la dist/
    '''
}

def dockerComposeBuild() {
    echo 'Building Docker images with docker-compose...'
    
    sh '''
        echo "Building Docker image..."
        docker-compose -f ${DOCKER_COMPOSE_FILE} build --no-cache
        
        echo "Docker build completed successfully"
        docker images | grep ${PROJECT_NAME}
    '''
}

def dockerComposeUp() {
    echo 'Starting application with docker-compose...'
    
    sh '''
        echo "Starting containers in detached mode..."
        docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
        
        echo "Waiting for application to start..."
        sleep 10
        
        echo "Checking container status..."
        docker-compose -f ${DOCKER_COMPOSE_FILE} ps
        
        echo "Application is now running on port 6969"
        curl -f http://localhost:6969 || echo "Application might still be starting..."
    '''
}
