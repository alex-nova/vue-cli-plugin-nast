const start = require('./service/start')

/**
 *
 *
 * @param {object}api https://cli.vuejs.org/dev-guide/plugin-api.html#chainwebpack
 * @param {object}config vue.config.js
 */
module.exports = (api, config) => {
  const serve = api.service.commands.serve.fn
  api.service.commands.serve.fn = (...args) => {
    start(args, api, config)
    serve(...args)
  }
  
  const build = api.service.commands.build.fn
  api.service.commands.build.fn = (...args) => {
    start(args, api, config)
    build(...args)
  }
  
  // api.registerCommand(
  //   'serve',
  //   {
  //     description: 'Run app in browser, only dev yet (ssr not enabled)',
  //     usage: 'vue-cli-service start [options]',
  //     options: {
  //       '--mode': 'default: production, can be: development|production',
  //       '--platform': 'default: web, can be: server|web|android|ios|mac|windows|linux',
  //       '--env': 'default: production, can be: development|testing|alpha|beta|demo|production|whatever',
  //       '--theme': 'default: web, can be: web|android|ios|mac|windows|linux|whatever',
  //     },
  //   },
  //   (...args) => {
  //     api.service.commands.serve.fn(...args)
  //   },
  // )
  // api.registerCommand(
  //   'build:web',
  //   {
  //     description: 'Build app for web',
  //     usage: 'vue-cli-service build:web [options]',
  //     options: {
  //       '--mode': 'default: production, can be: development|production',
  //       '--env': 'default: production, can be: development|testing|alpha|beta|demo|production|whatever',
  //       '--theme': 'default: web, can be: web|android|ios|mac|windows|linux|whatever',
  //       '--type': 'hash|prerender|sfa',
  //     },
  //   },
  //   (args) => {
  //     api.configureWebpack({})
  //   }
  // )
  // api.registerCommand(
  //   'build:android',
  //   {
  //     description: 'Build app for android platform',
  //     usage: 'vue-cli-service build:android [options]',
  //     options: {
  //       '--theme': 'default: web, can be: web|android|ios|mac|windows|linux|whatever',
  //       '--env': 'default: production, can be: develop|testing|demo|production|whatever',
  //     },
  //   },
  //   (args) => {
  //     api.configureWebpack({})
  //   }
  // )
}

module.exports.defaultModes = {
  serve: 'development',
}
