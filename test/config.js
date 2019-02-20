const chai = require('chai')
const sinon = require('sinon')

chai.config.includeStack = true
chai.use(require('sinon-chai'))
chai.use(require('dirty-chai'))

Object.assign(global, {
  expect: chai.expect,
  sinon: sinon
})
