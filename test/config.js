const chai = require('chai')
const sinon = require('sinon')

chai.config.includeStack = true
chai.use(require('sinon-chai'))

Object.assign(global, {
  expect: chai.expect,
  sinon: sinon
})
