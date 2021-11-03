module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true

  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module'
  },

  rules: {
    'no-console': 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "none",
      "ignore-pattern": "^_",
      "varsIgnorePattern": "[iI]gnored",
    }]
  }
};