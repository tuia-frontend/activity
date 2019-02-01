const express = require('express')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const devConfig = require('./webpack.dev.config')
const env = require('./units/env')[process.env.NODE_ENV]

const app = express()
const compiler = webpack(devConfig)

// 热更新
const webpackMid = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  stats: 'errors-only',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
app.use(webpackMid)
app.use(webpackHotMiddleware(compiler))
// 静态资源目录
app.use(express.static(path.join(__dirname, '../dist/')))
// mock数据
app.get('*', (req, res) => {
  const mockJsPath = path.resolve(__dirname, '../mock' + req.path + '.js')
  if (fs.existsSync(mockJsPath)) {
    res.send(require(mockJsPath)(req))
  } else {
    res.send(require(path.resolve(__dirname, '../mock/default.js'))(req))
  }
})

app.listen(env.port, () => {
  console.log(`listen at ${env.port}`)
})