const fs = require('fs')
const path = require('path')

function getConfigFile() {
  let configFile = path.join(process.cwd(), 'config.js')
  if(fs.existsSync(configFile)) {
    return configFile;
  }

  configFile = path.join(process.cwd(), 'config/index.js')
  if(fs.existsSync(configFile)) {
    return configFile;
  }
}

module.exports = getConfigFile
