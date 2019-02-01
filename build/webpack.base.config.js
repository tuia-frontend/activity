const webpack = require('webpack')
const path = require('path')
const entry = require('./units/entry')
const env = require('./units/env')[process.env.NODE_ENV]
const skins = process.argv.splice(2)

const entries = entry.entries(skins)
entries['base'] = [path.join(__dirname, '../src/common/base/index.js')]
const pages = entry.pages(skins, ['base'])

const config = {
  mode: env.mode,
  entry: entries,
  stats: 'errors-only',
  output: {
    path: env.dist,
    filename: '[name].js',
    publicPath: env.publicPath,
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: pages,
  resolve: {
    extensions: ['.js', '.less', '.css'],
    alias: {
      'src': path.resolve(__dirname, '../src/'),
      'components': path.resolve(__dirname, '../src/components/'),
      'static': path.resolve(__dirname, '../src/static/'),
      'common': path.resolve(__dirname, '../src/common/'),
      'styles': path.resolve(__dirname, '../src/common/styles/')
    }
  }
}

module.exports = config