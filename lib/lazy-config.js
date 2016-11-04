const getConfig = require('./get-config')
const createLazyFunctionProxy = require('./create-lazy-fn-proxy')

function lazyConfig() {
  const configFile = getConfig()

  return createLazyFunctionProxy(configFile)
}

module.exports = lazyConfig
