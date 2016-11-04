const fs = require('fs')
const path = require('path')

function getConfig() {
  let config
  const env = process.env.NODE_ENV

  configFile = path.join(process.cwd(), 'config/default')
  if(fs.existsSync(configFile)) {
    config = require(configFile)
  }

  if(env) {
    configFile = path.join(process.cwd(), `config/${env}`)
    if(fs.existsSync(configFile)) {
      const envConfig = require(configFile)
      Object.assign(config, envConfig)
    }
  }

  if(!config) {
    throw new Error('missing config file')
  }
  
  return config
}

module.exports = getConfig
