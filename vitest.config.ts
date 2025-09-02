/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom', // Lighter than jsdom
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules/', 'dist/', 'src/test/'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary'],
      include: ['src/utils/**/*.ts', 'src/components/**/*.tsx'],
      exclude: ['**/*.d.ts', '**/*.config.*', '**/test/**'],
      thresholds: {
        global: {
          branches: 70,
          functions: 70, 
          lines: 70,
          statements: 70,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});