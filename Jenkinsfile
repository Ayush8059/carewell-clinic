pipeline {
  agent any
  environment {
    IMAGE = "ayush805900/carewell"
    TAG   = "${BUILD_NUMBER}"
  }
  stages {
    stage('Install & Test') {
      steps { sh 'docker run --rm -u $(id -u):$(id -g) -e npm_config_cache=/tmp/.npm -v $PWD:/app -w /app node:20-alpine sh -c "npm install && npm test"' }
    }
    stage('Build Docker Image') {
      steps { sh 'docker build -t $IMAGE:$TAG .' }
    }
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'U', passwordVariable: 'P')]) {
          sh 'echo $P | docker login -u $U --password-stdin'
          sh 'docker push $IMAGE:$TAG'
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        sh 'sed -i "s|:IMAGE_TAG|:$TAG|" k8s/deployment.yaml'
        sh 'kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml'
        sh 'kubectl rollout status deployment/carewell --timeout=300s'
      }
    }
  }
}
