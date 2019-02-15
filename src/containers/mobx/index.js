import { observable, computed, reaction, autorun } from 'mobx'
import Emitter from 'events'

/**
 * 公共代码
 */
class Store extends Emitter {
  @observable price = 0
  @observable amount = 2
  @observable todos = [
    { title: '1', completed: true }
  ]

  @computed get total() {
    return this.price * this.amount
  }
}
var app = new Store()
window.app = app

console.log(app)

reaction(
  () => app.total,
  (val, reaction) => {
    app.emit(`total.update`, val, reaction)
  }
)

var render = {
  price: autorun(() => {
    console.log(app.price)
  })
}
/**
 * 业务代码
 */
setInterval(() => {
  app.todos.push({ title: app.price, completed: true })
  app.price += 1
  if (app.price > 10) {
    render.price()
  }
}, 1000)