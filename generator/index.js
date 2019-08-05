
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'lodash': '^4.*',
      'nast': '^0.*',
      'nast-ui': '^0.*',
    },
    devDependencies: {
      '@babel/plugin-proposal-class-properties': '^7.5.0',
      '@babel/preset-env': '^7.5.4',
      'eslint-config-google': '^0.13.0',
      'sass': '^1.22.3',
      'sass-loader': '^7.1.0',
    },
    eslintIgnore: [
      'node_modules',
      'publish',
    ],
  })
  
  api.render('./template')
}
