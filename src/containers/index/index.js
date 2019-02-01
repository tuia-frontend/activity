/**
 * 活动工具的base文件
 */
import './base/index'

/**
 * 活动文件皮肤代码
 */

// 1 - 皮肤样式
import './index.less'
// 2 - 全局你要关心的东西
console.log(CFG) // 这个不用说了你也懂
console.log(t) // 发布订阅

// 3 - 监听fullname熟悉的update状态
t.on('fullname.update', val => {
  console.log('fullname.update：' + val)
})

// 4 - 修改name熟悉，看控制台
CFG.name = 'zhangmin'

// 5 - 你再看控制台
setTimeout(() => {
  CFG.name = 'ZhangMin'
}, 1000)

// 6 - 回头去看看base文件里面干了什么
// 7 - 如果你仔细看完了，会发现其实是参考了vue






