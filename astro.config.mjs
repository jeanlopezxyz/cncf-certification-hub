// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jeanlopezxyz.github.io',
  base: '/repo-cert',
  output: 'static',
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "pt"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()],
    // Performance and security-focused build configuration
    build: {
      // Enable source maps only in development for security
      sourcemap: import.meta.env.MODE === 'development',
      // Aggressive minification with esbuild
      minify: 'esbuild',
      target: 'es2020',
      // Report compressed size
      reportCompressedSize: true,
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          },
          chunkFileNames: '_assets/[name]-[hash].js',
          entryFileNames: '_assets/[name]-[hash].js',
          assetFileNames: '_assets/[name]-[hash].[ext]',
        },
      },
      // Reduce chunk size warning limit
      chunkSizeWarningLimit: 150,
      // CSS code splitting
      cssCodeSplit: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@astrojs/react'],
    },
    // Security headers and server configuration
    server: {
      // Strict CORS in development
      cors: {
        origin: ['http://localhost:4321', 'https://jeanlopezxyz.github.io'],
        credentials: false,
      },
      // Security headers for dev server
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  },
  integrations: [react()],
  // Security-focused build options
  build: {
    // Inline small assets for better security
    inlineStylesheets: 'auto',
    // Assets directory for better cache control
    assets: '_assets',
  },
});