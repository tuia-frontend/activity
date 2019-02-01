const units = require('./utils')
const port = '2019'
const path = require('path')
const ip = units.getIPAdress()
const dist = path.resolve(__dirname, '../../dist/assets/')
const containers = path.resolve(__dirname, '../../src/containers/')

module.exports = {
  dev: {
    ip,
    port,
    dist,
    containers,
    mode: 'development',
    publicPath: '/dist/'
  },
  prod: {
    dist,
    containers,
    mode: 'production',
    devtool: 'none',
    // devtool: 'hidden-source-map',
    publicPath: './assets/'
  }
}