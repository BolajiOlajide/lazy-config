const fs = require('fs')

const getConfig = require('./get-config')

describe('get-config', () => {
  beforeEach(() => {
    fs.mkdirSync('common/config', { recursive: true })
  })

  afterEach(() => {
    fs.rmdirSync('common/config', { recursive: true })
  })

  context('when a common config exists', () => {
    let result

    const serviceConfig = `module.exports = {
      secret: 'dev-secret'
    }`

    const commonConfig = `module.exports = {
      secret: 'common-secret',
      shared: 'value'
    }`

    beforeEach(() => {
      fs.writeFileSync('config/default.js', serviceConfig, 'utf8')
      fs.writeFileSync('common/config/default.js', commonConfig, 'utf8')

      result = getConfig()
    })

    afterEach(() => {
      fs.unlinkSync('config/default.js')
      fs.unlinkSync('common/config/default.js')
    })

    it('should merge the common config with the service config', () => {
      expect(result).to.eql({
        secret: 'dev-secret',
        shared: 'value'
      })
    })
  })

  context('when no NODE_ENV is set', () => {
    let result

    const serviceConfig = `module.exports = {
      secret: 'dev-secret'
    }`

    beforeEach(() => {
      fs.writeFileSync('config/default.js', serviceConfig, 'utf8')

      result = getConfig()
    })

    afterEach(() => {
      fs.unlinkSync('config/default.js')
    })

    it('should return the serviceConfig', () => {
      expect(result).to.eql({
        secret: 'dev-secret'
      })
    })
  })

  context('when a NODE_ENV is set', () => {
    let env, result

    const serviceConfig = `module.exports = {
      secret: 'dev-secret'
    }`

    const productionConfig = `module.exports = {
      secret: 'production-secret',
    }`

    beforeEach(() => {
      fs.writeFileSync('config/default.js', serviceConfig, 'utf8')
      fs.writeFileSync('config/production.js', productionConfig, 'utf8')

      env = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      result = getConfig()
    })

    afterEach(() => {
      process.env.NODE_ENV = env

      fs.unlinkSync('config/default.js')
      fs.unlinkSync('config/production.js')
    })

    it('should merge the common config with the default', () => {
      expect(result).to.eql({
        secret: 'production-secret'
      })
    })
  })

  context('when no configs exist', () => {
    it('should throw an error', () => {
      expect(() => {
        getConfig()
      }).to.throw(/missing or empty config file/)
    })
  })
})
