module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', '.astro', '*.astro'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Code quality rules for community project
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Community contribution guidelines
    'no-console': 'warn', // prefer proper logging
    'no-debugger': 'error',
    'eqeqeq': 'error',
    'curly': 'error',
  },
};