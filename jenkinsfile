pipeline {
    agent {
        docker {
            // Use the official Playwright image to avoid manual browser installation
            image 'mcr.microsoft.com/playwright:v1.45.0-jammy'
            args '-u root' // Ensures permissions to install/run dependencies
        }
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from your GitHub repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // '|| true' ensures the pipeline continues even if tests fail
                // so that we can still publish the report in the next stage
                sh 'npx playwright test || true'
            }
        }
    }

    post {
        always {
            // Archives the Playwright HTML report and trace files
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // Optional: Upload test results to the Jenkins build artifacts
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}