const getConfigFile = require('./get-config-file')
const createLazyFunctionProxy = require('./create-lazy-fn-proxy')

function lazyConfig() {
  const configFile = getConfigFile()

  if(!configFile) {
    throw new Error('missing config file')
  }

  return createLazyFunctionProxy(require(configFile))
}

module.exports = lazyConfig
