// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://jeanlopezxyz.github.io',
  base: '/cncf-certification-hub',
  output: 'static',
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "pt"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    react(),
    tailwind()
  ],
  vite: {
    build: {
      sourcemap: false,
      minify: 'esbuild',
      target: 'es2020',
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
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
      chunkSizeWarningLimit: 200,
      cssCodeSplit: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@astrojs/react'],
    },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
});