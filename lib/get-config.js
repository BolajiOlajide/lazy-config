const fs = require('fs')
const path = require('path')
const merge = require('deepmerge')
const R = require('ramda')

function getConfig () {
  let config = {}

  config = mergeConfig(config, 'common/config/default.js')
  config = mergeConfig(config, 'config/default.js')

  if (process.env.NODE_ENV) {
    config = mergeConfig(config, `config/${process.env.NODE_ENV}.js`)
  }

  if (R.isEmpty(config)) {
    throw new Error('missing or empty config file')
  }

  return config
}

function mergeConfig (config, filePath) {
  const configPath = path.join(process.cwd(), filePath)
  if (fs.existsSync(configPath)) {
    const commonConfig = require(configPath)
    config = merge(config, commonConfig)
  }

  return config
}

module.exports = getConfig
