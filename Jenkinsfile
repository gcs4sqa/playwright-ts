pipeline {
    agent any // Or use agent { label 'your-node-label' }

    environment {
        // Ensures colored output in Jenkins logs
        FORCE_COLOR = '1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
                
                // If browsers aren't globally installed on the server, 
                // this command downloads them to the local cache.
                echo 'Installing Playwright Browsers...'
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Tests...'
                // Running with --reporter=list/line helps see progress in Jenkins logs
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Publishes the HTML report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // Keeps the report files as a zip in the build artifacts
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        
        failure {
            echo 'Tests failed! Check the Playwright HTML Report for details and traces.'
        }
    }
}
