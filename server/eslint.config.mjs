// import js from "@eslint/js";
// import tseslint from "typescript-eslint";

// export default [
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     ignores: ["dist", "build", "node_modules"],
//     languageOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",
//     },
//     rules: {
//       "no-console": "off",
//     },
//   },
// ];

// import js from '@eslint/js';
// import prettierPlugin from 'eslint-plugin-prettier';
// import globals from 'globals';



// import tseslint from 'typescript-eslint';
// import { defineConfig, globalIgnores } from 'eslint/config';
// import configPrettier from 'eslint-config-prettier';

// export default defineConfig([
//   configPrettier,
//   {
//     plugins: {
//       prettier: prettierPlugin,
//     },
//     rules: {
//       'prettier/prettier': 'error',
//     },
//   },
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ]);

// eslint.config.js
// import js from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import prettier from 'eslint-plugin-prettier';

// export default [
//   // Ignore build & dependencies
//   {
//     ignores: ['node_modules/**', 'dist/**'],
//   },

//   // Base JS rules
//   js.configs.recommended,

//   // TypeScript rules
//   ...tseslint.configs.recommended,

//   // Your backend files
//   {
//     files: ['**/*.ts'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//     },
//     plugins: {
//       prettier,
//     },
//     rules: {
//       // Prettier handles formatting
//       'prettier/prettier': 'error',

//       // Common backend relaxations
//       '@typescript-eslint/no-unused-vars': ['warn'],
//       '@typescript-eslint/explicit-function-return-type': 'off',
//     },
//   },
// ];

// eslint.config.js
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';

export default [
  // Ignore folders
  {
    ignores: ['node_modules/**', 'dist/**'],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',

      // Optional relaxations
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
