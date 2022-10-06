module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'security', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'prettier'
  ],
  rules: {
    'no-console': 1,
    'prettier/prettier': 2
  }
}
