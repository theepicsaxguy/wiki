import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        Node: 'readonly',
        Element: 'readonly',
        // Node globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': jsxA11y,
      'react': react,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Allow unused vars with underscore prefix
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Allow any type in some cases
      '@typescript-eslint/no-explicit-any': 'warn',
      // Allow label with htmlFor
      'jsx-a11y/label-has-associated-control': ['error', {
        assert: 'either',
      }],
      // Note: react/forbid-elements rule is available to enforce component usage
      // Currently disabled for implementation files but can be enabled for content files
      // 'react/forbid-elements': ['warn', {
      //   forbid: [
      //     { element: 'div', message: 'Use semantic components like <Box> or <Card> instead of <div>' },
      //   ],
      // }],
    },
  },
  {
    // Ignore patterns
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      // MDX files are excluded from linting for now due to parser complexity
      // Manual code review should ensure semantic component usage in MDX files
      '**/*.mdx',
    ],
  },
];
