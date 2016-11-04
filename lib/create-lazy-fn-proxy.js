module.exports = createLazyFunctionProxy

function createLazyFunctionProxy(attrs) {
  return new Proxy(attrs, {
    get(target, property) {
      if(typeof target[property] === 'object') {
        return createLazyFunctionProxy(target[property])
      }

      if(typeof target[property] === 'function') {
        return target[property]()
      }

      return Reflect.get(...arguments)
    }
  })
}
