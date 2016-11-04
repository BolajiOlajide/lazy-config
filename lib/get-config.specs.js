const proxyquire = require('proxyquire')
const fs = require('fs')

describe('get-config-file', () => {
  context('when using config.js', () => {
    let result, getConfigFile, existsSync

    before(() => {
      existsSync = sinon.stub(fs, 'existsSync')
      existsSync.onCall(0).returns(true)

      getConfigFile = proxyquire('./get-config-file', {
        fs: {
          existsSync
        }
      })

      result = getConfigFile()
    })

    after(() => {
      fs.existsSync.restore()
    })

    it('should have the correct config path', () => {
      expect(result.endsWith('config.js')).to.be.true
    })
  })

  context('when using config/index.js', () => {
    let result, getConfigFile, existsSync

    before(() => {
      existsSync = sinon.stub(fs, 'existsSync')
      existsSync.onCall(0).returns(false)
      existsSync.onCall(1).returns(true)

      getConfigFile = proxyquire('./get-config-file', {
        fs: {
          existsSync
        }
      })

      result = getConfigFile()
    })

    after(() => {
      fs.existsSync.restore()
    })

    it('should have the correct config path', () => {
      expect(result.endsWith('index.js')).to.be.true
    })
  })
})
