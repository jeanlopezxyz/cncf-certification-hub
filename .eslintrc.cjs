module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', '.astro', '*.astro'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    // General code quality
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off', // handled by TS override
    'no-console': 'warn',
    'no-debugger': 'error',
    'eqeqeq': 'error',
    'curly': ['error', 'multi-line'],
    // React specifics for modern setup
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // using TS for types
    'react/no-unescaped-entities': 'warn',
    // Accessibility: start as warnings to avoid blocking PRs
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    // Hooks: start as warning to ease adoption
    'react-hooks/rules-of-hooks': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      excludedFiles: ['src/data/**/*'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-empty-object-type': 'warn',
        // Custom rule to prevent hardcoded strings in TSX files
        'no-restricted-syntax': [
          'warn',
          {
            selector: 'JSXText[value=/[A-Za-z]{2,}/]',
            message: 'Avoid hardcoded text in JSX. Use translation keys with t() function instead.',
          },
          {
            selector: 'TemplateLiteral > TemplateElement[value.raw=/[A-Z][a-z]+\\s+[A-Za-z]+/]',
            message: 'Avoid hardcoded text in template literals. Use translation keys instead.',
          },
        ],
      },
    },
  ],
};
