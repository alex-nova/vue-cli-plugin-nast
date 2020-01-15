/* eslint-disable no-empty */
const path = require('path')
const defaultConfig = require('./defaultConfig')

/**
 * @param {string} configDir
 * @return {{components, boot}}
 */
module.exports = (configDir) => {
  let config = defaultConfig
  let components = {}
  
  try {
    config = Object.assign(config, require(path.resolve(configDir, 'build')))
  } catch (e) {}
  
  try {
    components = require(path.resolve(configDir, 'components'))
  } catch (e) {}
  
  return {
    config,
    components,
  }
}
