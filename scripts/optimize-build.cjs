#!/usr/bin/env node

/**
 * Build Optimization Script
 * 
 * Post-build optimizations for better performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COLORS = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(color, message) {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

/**
 * Optimize HTML files
 */
function optimizeHTML(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let optimizedCount = 0;
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      optimizedCount += optimizeHTML(fullPath);
    } else if (file.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalSize = content.length;
      
      // Remove unnecessary whitespace
      content = content.replace(/\s+/g, ' ');
      content = content.replace(/> </g, '><');
      content = content.replace(/<!--[\s\S]*?-->/g, '');
      
      // Remove empty attributes
      content = content.replace(/\s+(?:class|id|style)=""/g, '');
      
      // Optimize inline styles
      content = content.replace(/style="([^"]*)"/g, (match, styles) => {
        const optimized = styles
          .replace(/\s*:\s*/g, ':')
          .replace(/\s*;\s*/g, ';')
          .replace(/;$/, '');
        return `style="${optimized}"`;
      });
      
      const newSize = content.length;
      if (newSize < originalSize) {
        fs.writeFileSync(fullPath, content);
        optimizedCount++;
      }
    }
  }
  
  return optimizedCount;
}

/**
 * Optimize CSS files
 */
function optimizeCSS(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let optimizedCount = 0;
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      optimizedCount += optimizeCSS(fullPath);
    } else if (file.name.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalSize = content.length;
      
      // Remove comments
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      
      // Remove unnecessary whitespace
      content = content.replace(/\s+/g, ' ');
      content = content.replace(/\s*([{}:;,])\s*/g, '$1');
      
      // Remove empty rules
      content = content.replace(/[^{}]+\{\s*\}/g, '');
      
      const newSize = content.length;
      if (newSize < originalSize) {
        fs.writeFileSync(fullPath, content);
        optimizedCount++;
      }
    }
  }
  
  return optimizedCount;
}

/**
 * Add preload hints to HTML
 */
function addPreloadHints(dir) {
  const indexPath = path.join(dir, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Find critical CSS and JS files
    const cssFiles = content.match(/href="([^"]*\.css)"/g) || [];
    const jsFiles = content.match(/src="([^"]*\.js)"/g) || [];
    
    // Add preload hints if not already present
    if (!content.includes('rel="preload"')) {
      const preloadHints = [];
      
      // Preload critical CSS
      if (cssFiles.length > 0) {
        const criticalCSS = cssFiles[0].match(/href="([^"]*)"/)[1];
        preloadHints.push(`<link rel="preload" href="${criticalCSS}" as="style">`);
      }
      
      // Preload critical fonts
      preloadHints.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
      preloadHints.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
      
      // Insert preload hints in head
      if (preloadHints.length > 0) {
        const headEnd = content.indexOf('</head>');
        if (headEnd > -1) {
          content = content.slice(0, headEnd) + 
                   preloadHints.join('\n  ') + '\n  ' + 
                   content.slice(headEnd);
          fs.writeFileSync(indexPath, content);
          return true;
        }
      }
    }
  }
  
  return false;
}

/**
 * Generate service worker for caching
 */
function generateServiceWorker(distPath) {
  const swContent = `
// Service Worker for CNCF Cert Hub
const CACHE_NAME = 'cncf-cert-hub-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/_assets/client.js',
  '/_assets/index.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;

  fs.writeFileSync(path.join(distPath, 'sw.js'), swContent);
  return true;
}

/**
 * Main optimization function
 */
function main() {
  log('blue', '🚀 Starting build optimizations...\n');
  
  const distPath = 'dist';
  
  if (!fs.existsSync(distPath)) {
    log('yellow', '⚠️  Dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  // Optimize HTML
  log('blue', '📄 Optimizing HTML files...');
  const htmlOptimized = optimizeHTML(distPath);
  log('green', `✅ Optimized ${htmlOptimized} HTML files`);
  
  // Optimize CSS
  log('blue', '🎨 Optimizing CSS files...');
  const cssOptimized = optimizeCSS(distPath);
  log('green', `✅ Optimized ${cssOptimized} CSS files`);
  
  // Add preload hints
  log('blue', '⚡ Adding preload hints...');
  const preloadAdded = addPreloadHints(distPath);
  if (preloadAdded) {
    log('green', '✅ Added preload hints to index.html');
  }
  
  // Generate service worker
  log('blue', '📦 Generating service worker...');
  const swGenerated = generateServiceWorker(distPath);
  if (swGenerated) {
    log('green', '✅ Generated service worker');
  }
  
  // Calculate size (without shell, compatible with restricted environments)
  log('blue', '\n📊 Calculating size...');
  function getDirSizeBytes(dir) {
    let total = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) total += getDirSizeBytes(full);
      else if (entry.isFile()) total += fs.statSync(full).size;
    }
    return total;
  }
  try {
    const bytes = getDirSizeBytes(distPath);
    const mb = (bytes / (1024 * 1024)).toFixed(1);
    log('green', `📦 Final build size: ${mb}M`);
  } catch (e) {
    log('yellow', '⚠️  Could not calculate build size in this environment');
  }
  
  log('green', '\n🎉 Build optimization completed!');
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeHTML,
  optimizeCSS,
  addPreloadHints,
  generateServiceWorker,
};
