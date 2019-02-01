import Dep from './dep'

export default class Observable {
  constructor (obj) {
    return this.walk(obj)
  }

  walk (obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      this.defineReactive(obj, key, obj[key])
    })
    return obj
  }

  defineReactive (obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get () {
        dep.depend()
        return val
      },
      set (newVal) {
        val = newVal
        dep.notify()
      }
    })
  }
}