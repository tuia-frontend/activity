import Emitter from 'events'
import Observable from './observer'
import Watcher from './watcher'

/**
 * 初始化一个发布订阅
 */
var t = new Emitter()
window.t = t

/**
 * 全局属性
 */
var CFG = new Observable({
  age: 0,
  name: 'zhangmin'
})
window.CFG = CFG

/**
 * 申明计算属性
 */
var computed = {
  fullname: () => {
    return 'hello ' + CFG.name
  }
}

/**
 * 将所有计算属性加入观察
 */
for (const key in computed) {
  new Watcher(computed, key, () => {
    return 'hello ' + CFG.name
  }, val => {
    t.emit(`${key}.update`, val)
  })
  // 将所有计算属性挂到全局
  CFG[key] = computed.fullname
}
