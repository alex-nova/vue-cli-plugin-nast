const path = require('path')
const get = require('lodash/get')
const webpack = require('webpack')
const nastVariables = require('nast-ui/utils/webpack/defineVariables')


module.exports = (args, api, config) => {
  args[0]['env'] = args[0]['env'] || 'production'
  args[0]['theme'] = args[0]['theme'] || 'web'
  if (!args[0]['mode']) {
    args[0]['mode'] = args[0]['env'] === 'development' ? 'development' : 'production'
  }
  
  api.configureWebpack((webpackConfig) => {
    const configDir = get(config, 'pluginOptions.nast.configDir', 'app/config')
    const appDir = get(config, 'pluginOptions.nast.appDir', 'app')
    let nestOptions = {}
    try {
      nestOptions = require(path.resolve(configDir, 'nast.js'))
    } catch (e) {} // eslint-disable-line no-empty
    
    webpackConfig.entry.app = './nast/src/indexClient.js'
    webpackConfig.resolve.modules.push(appDir)
    webpackConfig.resolve.alias['user-config'] = path.resolve(configDir)
    
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        '$env.prod': `${args[0]['mode'] !== 'development'}`,
        '$env.env': `'${args[0]['env']}'`,
        '$env.theme': `${args[0]['theme']}`,
        '$env.type': `${args[0]['type']}`,
        ...nastVariables(nestOptions, args[0]['theme']),
      }),
    )
  })
}
