const { expect } = require('chai')
const LazyConfig = require('..')

describe('LazyConfig', () => {
  it('should get a simple property', () => {
    const config = new LazyConfig({
      foo: 'bar'
    })

    expect(config.foo).to.equal('bar')
  })

  it('should get a nested property', () => {
    const config = new LazyConfig({
      foo: {
        bar: 'baz'
      }
    })

    expect(config.foo.bar).to.equal('baz')
  })

  it('should lazily evaluate a function', () => {
    let called = false

    const config = new LazyConfig({
      foo: () => {
        called = true
        return 'bar'
      }
    })

    expect(called).to.be.false
    expect(config.foo).to.eql('bar')
    expect(called).to.be.true
  })

  it('should lazily evaluate a function', () => {
    let called = false

    const config = new LazyConfig({
      foo: {
        bar: () => {
          called = true
          return 'baz'
        }
      }
    })

    expect(called).to.be.false
    expect(config.foo.bar).to.eql('baz')
    expect(called).to.be.true
  })
})
