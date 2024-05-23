module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/essential',
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/valid-v-slot': ['error', { allowModifiers: true,}],
      "vue/no-unused-vars": ["error", {
        "ignorePattern": "^_"
    }]
    },
  };