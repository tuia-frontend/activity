export default class Middleware {
  cache = []
  use(fn) {
    if (typeof fn !== 'function') {
      throw 'middleware must be a function'
    }
    this.cache.push(fn)
  }
  async next(data) {
    if (this.middlewares && this.middlewares.length > 0 ){
      var ware = this.middlewares.shift()
      if (data) {
        this.context.data = data
      }
      await ware.call(this, this.context, this.next.bind(this))
    }
  }
  start(options) {
    this.middlewares = this.cache.map(function(fn){
      return fn
    })
    this.context = {
      options
    }
    this.next()
  }
}