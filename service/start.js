const path = require('path')
const get = require('lodash/get')
const webpack = require('webpack')
const nastVariables = require('nast-ui/utils/webpack/defineVariables')


module.exports = (args, api, config) => {
  args[0]['env'] = args[0]['env'] || api.service.mode
  args[0]['theme'] = args[0]['theme'] || 'web'
  if (!args[0]['mode']) {
    args[0]['mode'] = args[0]['env'] === 'development' ? 'development' : 'production'
  }
  
  const appDir = get(config, 'pluginOptions.nast.appDir', 'app')
  const configDir = get(config, 'pluginOptions.nast.configDir', `${appDir}/config`)
  let nestOptions = {}
  try {
    nestOptions = require(path.resolve(configDir, 'nast.js'))
  } catch (e) {} // eslint-disable-line no-empty
  
  api.chainWebpack((webpackConfig) => {
    webpackConfig.entry('app')
      .clear()
    webpackConfig.entry('app')
      .add('./node_modules/nast/src/indexClient.js')
  
    webpackConfig.resolve
      .modules.add(appDir)
      .end()
      .alias.set('user-config', path.resolve(configDir))
    
    webpackConfig.plugin('define-nast')
      .use(webpack.DefinePlugin, [ {
        '$env.prod': `${args[0]['mode'] !== 'development'}`,
        '$env.env': `'${args[0]['env']}'`,
        '$env.theme': `${args[0]['theme']}`,
        '$env.type': `${args[0]['type']}`,
        ...nastVariables(nestOptions, args[0]['theme']),
      }, ])
  
    webpackConfig.plugin('ignore-moment-locales')
      .use(webpack.IgnorePlugin, [ /^\.\/locale$/, /moment$/, ])
  
    webpackConfig.performance.set('maxEntrypointSize', 512000)
    webpackConfig.performance.set('maxAssetSize', 512000)
    
    
    const fn = webpackConfig.module.rule('js').exclude.values()[0]
    webpackConfig.module.rule('js').exclude
      .clear()
    webpackConfig.module.rule('js').exclude
      .add((...args) => {
        if (args[0].indexOf('node_modules\\nast\\') !== -1) {
          return false
        }
        if (args[0].indexOf('node_modules\\nast-ui\\') !== -1) {
          return false
        }
        return fn(...args)
      })
  })
}
