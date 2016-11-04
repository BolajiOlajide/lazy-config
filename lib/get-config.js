const fs = require('fs')
const path = require('path')
const merge = require('deepmerge')

function getConfig() {
  let config
  const env = process.env.NODE_ENV

  configFile = path.join(process.cwd(), 'config/default.js')
  if(fs.existsSync(configFile)) {
    config = require(configFile)
  }

  if(env) {
    configFile = path.join(process.cwd(), `config/${env}.js`)
    if(fs.existsSync(configFile)) {
      const envConfig = require(configFile)
      config = merge(config, envConfig)
    }
  }

  if(!config) {
    throw new Error('missing config file')
  }
  
  return config
}

module.exports = getConfig
