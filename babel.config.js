module.exports = api => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          targets: '> 0.25%, not dead',
          corejs: 3
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  }
}