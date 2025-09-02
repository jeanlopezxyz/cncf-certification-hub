#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes bundle sizes and dependencies without modifying build
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(process.cwd(), 'dist');
const ASSETS_DIR = path.join(DIST_DIR, '_assets');

async function analyzeBundles() {
  console.log('🔍 Analyzing bundle sizes...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  try {
    const files = fs.readdirSync(ASSETS_DIR);
    
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));
    
    let totalJsSize = 0;
    let totalCssSize = 0;

    console.log('📦 JavaScript Bundles:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const jsAnalysis = jsFiles.map(file => {
      const filePath = path.join(ASSETS_DIR, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalJsSize += stats.size;
      
      let type = 'Main';
      if (file.includes('react-vendor')) type = 'React Vendor';
      else if (file.includes('vendor')) type = 'Vendor';
      
      return { file, size: stats.size, sizeKB, type };
    }).sort((a, b) => b.size - a.size);

    jsAnalysis.forEach(({ file, sizeKB, type }) => {
      console.log(`${type.padEnd(12)} ${sizeKB.padStart(8)} KB  ${file}`);
    });

    console.log('\n🎨 CSS Files:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const cssAnalysis = cssFiles.map(file => {
      const filePath = path.join(ASSETS_DIR, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalCssSize += stats.size;
      
      return { file, sizeKB };
    }).sort((a, b) => b.size - a.size);

    cssAnalysis.forEach(({ file, sizeKB }) => {
      console.log(`CSS          ${sizeKB.padStart(8)} KB  ${file}`);
    });

    console.log('\n📊 Bundle Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total JavaScript: ${(totalJsSize / 1024).toFixed(2)} KB`);
    console.log(`Total CSS:        ${(totalCssSize / 1024).toFixed(2)} KB`);
    console.log(`Total Assets:     ${((totalJsSize + totalCssSize) / 1024).toFixed(2)} KB`);
    
    // Bundle health check
    console.log('\n🏥 Bundle Health Check:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const mainBundle = jsAnalysis.find(b => b.type === 'Main');
    if (mainBundle && mainBundle.size > 200 * 1024) {
      console.log('⚠️  Main bundle is large (>200KB)');
    } else {
      console.log('✅ Main bundle size is healthy');
    }
    
    const vendorBundle = jsAnalysis.find(b => b.type.includes('Vendor'));
    if (vendorBundle && vendorBundle.size > 300 * 1024) {
      console.log('⚠️  Vendor bundle is large (>300KB)');
    } else {
      console.log('✅ Vendor bundle size is healthy');
    }

    if (jsFiles.length > 10) {
      console.log('⚠️  Many JS chunks - consider reducing splits');
    } else {
      console.log('✅ Good chunk splitting strategy');
    }

  } catch (error) {
    console.error('❌ Failed to analyze bundles:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  analyzeBundles();
}