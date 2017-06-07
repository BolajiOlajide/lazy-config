module.exports = createLazyFunctionProxy

function createLazyFunctionProxy(attrs) {
  return new Proxy(attrs, {
    get(target, property) {
      if(Array.isArray(target[property])) {
        return Reflect.get(...arguments)
      }

      if(typeof target[property] === 'object') {
        return createLazyFunctionProxy(target[property])
      }

      if(typeof target[property] === 'function') {
        return target[property]()
      }

      return Reflect.get(...arguments)
    },

    getOwnPropertyDescriptor(target, property) {
      if (typeof target[property] === 'function') {
        return {
          configurable: true,
          enumerable: true,
          value: target[property](),
          writable: true
        }
      }

      return Reflect.getOwnPropertyDescriptor(...arguments)
    }
  })
}
