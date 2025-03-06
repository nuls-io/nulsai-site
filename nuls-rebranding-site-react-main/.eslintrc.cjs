module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '.prettierrc.cjs',
    'local-bot',
    'public',
    'ak-btc-helper-lib',
    'src/assets',
    'src/store/web3/**/*.ts',
    'ak-btc-helper',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
    // 'comma-dangle': 0,
    // '@typescript-eslint/space-before-function-paren': 0,
    // 'multiline-ternary': 0,
    // '@typescript-eslint/strict-boolean-expressions': 0,
    // '@typescript-eslint/no-unused-vars': 0,
    // '@typescript-eslint/no-explicit-any': 0,
    // 'react-hooks/exhaustive-deps': 0,
    // '@typescript-eslint/no-floating-promises': 0,
    // 'prettier/prettier': 0,
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'comma-dangle': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'multiline-ternary': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
}


// module.exports = {
//   extends: ['standard-with-typescript', 'plugin:react-hooks/recommended'],
//   parserOptions: {
//     project: './tsconfig.json',
//   },
//   plugins: ['prettier'],
//   rules: {
//     'prettier/prettier': ['error', { singleQuote: true, semi: false }],
//     'comma-dangle': 0,
//     '@typescript-eslint/space-before-function-paren': 0,
//     'multiline-ternary': 0,
//     '@typescript-eslint/strict-boolean-expressions': 0,
//     'space-before-function-paren': [
//       'error',
//       {
//         anonymous: 'always',
//         named: 'never',
//         asyncArrow: 'always',
//       },
//     ],
//   },
// }
