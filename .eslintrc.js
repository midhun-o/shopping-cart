module.exports = {
  extends: ['coddle-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/function-component-definition': 'off'
  },
  ignorePatterns: ['tailwind.config.js', 'postcss.config.js'], 
};
