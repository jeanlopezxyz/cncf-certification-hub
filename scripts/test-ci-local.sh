#!/bin/bash

# Script para simular el CI/CD pipeline localmente
# Uso: ./scripts/test-ci-local.sh [job_name]

set -e  # Exit on any error

echo "🚀 Testing CI Pipeline Locally"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

run_job() {
    local job_name=$1
    local job_description=$2
    
    echo -e "\n${BLUE}🔄 Running: ${job_name}${NC}"
    echo -e "${YELLOW}${job_description}${NC}"
    echo "----------------------------------------"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Parse arguments
JOB=${1:-"all"}

case $JOB in
    "quality"|"all")
        run_job "QUALITY" "TypeScript + ESLint + Prettier checks"
        
        # TypeScript Check
        echo "🔍 TypeScript validation..."
        if npm run typecheck; then
            success "TypeScript compilation successful"
        else
            error "TypeScript errors found"
        fi
        
        # ESLint Check  
        echo "🔍 ESLint validation..."
        if npm run lint; then
            success "ESLint validation passed"
        else
            error "ESLint errors found"
        fi
        
        # Prettier Check
        echo "🔍 Prettier format check..."
        if npm run format:check; then
            success "Code formatting is correct"
        else
            warning "Code formatting issues found. Run 'npm run format' to fix."
        fi
        
        if [ "$JOB" != "all" ]; then exit 0; fi
        ;;
esac

case $JOB in
    "build"|"all")
        run_job "BUILD" "Building project and checking bundle size"
        
        # Clean previous build
        echo "🧹 Cleaning previous build..."
        npm run clean
        
        # Build project
        echo "🏗️ Building project..."
        if npm run build; then
            success "Build completed successfully"
        else
            error "Build failed"
        fi
        
        # Check bundle size
        echo "📦 Bundle size analysis:"
        if [ -d "dist" ]; then
            echo "Total size:"
            du -sh dist/
            echo "Largest files:"
            find dist -name "*.js" -o -name "*.css" | head -10 | xargs ls -lh
            success "Bundle analysis completed"
        else
            error "Build directory not found"
        fi
        
        if [ "$JOB" != "all" ]; then exit 0; fi
        ;;
esac

case $JOB in
    "security"|"all")
        run_job "SECURITY" "Security audit and vulnerability scanning"
        
        # NPM Audit
        echo "🔒 Running npm audit..."
        if npm audit --audit-level=moderate; then
            success "No security vulnerabilities found"
        else
            warning "Security vulnerabilities detected. Review npm audit output."
        fi
        
        # Check for common security issues in code
        echo "🔍 Checking for hardcoded secrets..."
        if grep -r "password\|secret\|key\|token" src/ --exclude-dir=node_modules | grep -v "// " | grep -v "placeholder\|example"; then
            warning "Potential secrets found in code. Please review."
        else
            success "No obvious secrets found in code"
        fi
        
        if [ "$JOB" != "all" ]; then exit 0; fi
        ;;
esac

case $JOB in
    "links"|"all")
        run_job "LINK CHECK" "Validating external links"
        
        # Simple link check using curl (basic version)
        echo "🔗 Checking common external links..."
        
        urls=(
            "https://www.cncf.io"
            "https://kubernetes.io/docs/"
            "https://github.com"
        )
        
        failed_links=0
        for url in "${urls[@]}"; do
            if curl -s --head --request GET "$url" | grep "200 OK" > /dev/null; then
                echo "✅ $url"
            else
                echo "❌ $url"
                ((failed_links++))
            fi
        done
        
        if [ $failed_links -eq 0 ]; then
            success "All tested links are working"
        else
            warning "$failed_links links might be down"
        fi
        
        if [ "$JOB" != "all" ]; then exit 0; fi
        ;;
esac

case $JOB in
    "docker"|"all")
        run_job "DOCKER" "Testing Docker build"
        
        # Check if Docker is available
        if ! command -v docker &> /dev/null; then
            warning "Docker not found. Skipping Docker tests."
        else
            echo "🐳 Building Docker image..."
            
            # Create simple Dockerfile for testing
            cat > Dockerfile.test << 'EOF'
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
EOF
            
            if docker build -f Dockerfile.test -t cncf-cert-hub:test .; then
                success "Docker build successful"
                echo "🧹 Cleaning up..."
                docker image rm cncf-cert-hub:test || true
                rm -f Dockerfile.test
            else
                error "Docker build failed"
            fi
        fi
        
        if [ "$JOB" != "all" ]; then exit 0; fi
        ;;
esac

echo -e "\n${GREEN}🎉 Local CI testing completed!${NC}"
echo -e "${BLUE}💡 To run specific jobs: ./scripts/test-ci-local.sh [quality|build|security|links|docker]${NC}"