#!/bin/bash

# Script para ejecutar Lighthouse CI localmente
# Requiere: npm install -g @lhci/cli

echo "🚀 Running Lighthouse CI locally..."

# Check if lhci is installed
if ! command -v lhci &> /dev/null; then
    echo "⚠️  Lighthouse CI not found. Installing..."
    npm install -g @lhci/cli
fi

# Build the project first
echo "🏗️ Building project..."
npm run build

# Start a local server
echo "🌐 Starting local server..."
npx serve dist -l 8080 &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Run Lighthouse CI
echo "🔍 Running Lighthouse tests..."
lhci collect --url=http://localhost:8080 \
  --url=http://localhost:8080/certifications/kcna/ \
  --url=http://localhost:8080/achievements/kubestronaut/

# Generate HTML report
lhci upload --target=filesystem --outputDir=./lighthouse-reports

# Cleanup
echo "🧹 Cleaning up..."
kill $SERVER_PID

echo "✅ Lighthouse CI completed!"
echo "📊 Reports saved in: ./lighthouse-reports/"