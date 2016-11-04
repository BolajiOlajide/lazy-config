const proxyquire = require('proxyquire')

describe('lazyConfig', () => {
  it('should load the config', () => {
    const config = require('./lazy-config')

    expect(config).to.be.defined
  })

  context('when missing the config file', () => {
    let config

    before(() => {
      config = proxyquire('./lazy-config', {
        './get-config-file': function() {
          return
        }
      })
    })

    it('should throw an error', () => {
      expect(config).to.throw(/missing config file/)
    })
  })
})
