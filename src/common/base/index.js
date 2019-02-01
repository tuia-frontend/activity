import 'static/libs/zepto'
import 'normalize.css'
import 'styles/global.css'

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      import(/* webpackChunkName: "fastclick" */'static/libs/fastclick').then(() => {
        FastClick.attach(document.body)
      })
    },
    false
  )
}