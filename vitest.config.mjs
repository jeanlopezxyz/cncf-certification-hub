import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
    include: ['tests/**/*.test.{js,jsx,ts,tsx}'],
  },
});

