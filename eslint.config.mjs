import next from 'eslint-config-next'

export default [
  ...next,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'warn',
    },
  },
]


