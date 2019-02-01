const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const htmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const merge = require('webpack-merge')

Object.keys(baseConfig.entry).forEach(function(name){
  baseConfig.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(baseConfig.entry[name]);
})

const config = merge(baseConfig, {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 200
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config