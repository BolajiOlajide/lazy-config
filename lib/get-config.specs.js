const mock = require('mock-require')
const path = require('path')

describe('get-config', () => {
  context('when no NODE_ENV is set', () => {
    let result, getConfig, existsSync

    const defaultConfig = {
      test: 'hello',
      value: 'dev-value'
    }

    before(() => {
      existsSync = sinon.stub()
      existsSync.onCall(0).returns(true)
      mock('fs', {
        existsSync
      })
      
      const devPath = 'dev-config-path'
      join = sinon.stub()
      join.onCall(0).returns(devPath)
      mock('path', {
        join
      })

      mock(devPath, defaultConfig)

      getConfig = require('./get-config')
      
      result = getConfig()
    })

    after(() => {
      mock.stopAll()      
    })

    it('should get the default config', () => {
      expect(result).to.eql(defaultConfig)
    })
  })

  context('when a NODE_ENV is set', () => {
    let result, getConfig, existsSync, env

    const defaultConfig = {
      test: 'hello',
      value: 'dev-value'
    }

    const productionConfig = {
      value: 'production-value'
    }

    before(() => {
      env = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      existsSync = sinon.stub()
      existsSync.onCall(0).returns(true)
      existsSync.onCall(1).returns(true)
      mock('fs', {
        existsSync
      })

      const devPath = 'dev-config-path'
      const prodPath = 'prod-config-path'
      join = sinon.stub()
      join.onCall(0).returns(devPath)
      join.onCall(1).returns(prodPath)
      mock('path', {
        join
      })

      mock(devPath, defaultConfig)
      mock(prodPath, productionConfig)

      mock.reRequire('./get-config')
      getConfig = require('./get-config')

      result = getConfig()
    })

    after(() => {
      process.env.NODE_ENV = env
      mock.stopAll()
    })

    it('should get the NODE_ENV config', () => {
      expect(result.value).to.equal('production-value')
    })

    it('should get the default config', () => {
      expect(result.test).to.equal('hello')
    })
  })

  context('when no configs exist', () => {
    let getConfig

    before(() => {
      existsSync = sinon.stub()
      existsSync.onCall(0).returns(false)
      mock('fs', {
        existsSync
      })

      getConfig = require('./get-config')
    })

    after(() => {
      mock.stopAll()
    })
    
    it('should throw an error', () => {
      expect(() => {
        getConfig()
      }).to.throw(/missing config file/)
    })
  })
})
