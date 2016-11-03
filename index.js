module.exports = LazyConfig

function LazyConfig(attrs) {
  return new Proxy(attrs, {
    get(target, property) {
      if(typeof target[property] === 'object') {
        return new LazyConfig(target[property])
      }

      if(typeof target[property] === 'function') {
        return target[property]()
      }

      return Reflect.get(...arguments)
    }
  })
}
