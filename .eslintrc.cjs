require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:jest/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', 'jest'],
  rules: {
    // TODO: propsのエラーを回避 他の方法ある？
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'props',
      },
    ],
  },
};
