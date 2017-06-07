const { expect } = require('chai')
const createLazyFunctionProxy = require('../lib/create-lazy-fn-proxy')

describe('createLazyFunctionProxy', () => {
  it('should get a simple property', () => {
    const config = createLazyFunctionProxy({
      foo: 'bar'
    })

    expect(config.foo).to.equal('bar')
  })

  it('should return the correct property descriptor', () => {
    const config = createLazyFunctionProxy({
      foo: () => {
        return 'bar'
      }
    })

    const descriptor = Object.getOwnPropertyDescriptor(config, 'foo')

    expect(descriptor.configurable).to.be.true
    expect(descriptor.enumerable).to.be.true
    expect(descriptor.value).to.eql('bar')
    expect(descriptor.writable).to.be.true
  })

  it('should get a nested property', () => {
    const config = createLazyFunctionProxy({
      foo: {
        bar: 'baz'
      }
    })

    expect(config.foo.bar).to.equal('baz')
  })

  it('should lazily evaluate a function', () => {
    let called = false

    const config = createLazyFunctionProxy({
      foo: () => {
        called = true
        return 'bar'
      }
    })

    expect(called).to.be.false
    expect(config.foo).to.eql('bar')
    expect(called).to.be.true
  })

  it('should lazily evaluate a nested function', () => {
    let called = false

    const config = createLazyFunctionProxy({
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

  it('should get a property that is an array', () => {
    const config = createLazyFunctionProxy({
      foo: ['bar']
    })

    expect(config.foo).to.be.an('array')
    expect(config.foo).to.eql(['bar'])
    expect(config.foo.map).to.exist
  })
})
