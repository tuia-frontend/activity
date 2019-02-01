const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const cleanwebpackplugin = require('clean-webpack-plugin')
const os = require('os')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const env = require('./units/env')[process.env.NODE_ENV]

const config = merge(baseConfig, {
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].chunk.[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 200 / 640 * 750
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
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new cleanwebpackplugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: false,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].chunk.[contenthash:8].css"
    }),
    new webpack.HashedModuleIdsPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.BannerPlugin({
      banner: `built by ${os.hostname()} at ${(new Date()).toLocaleString()}`
    }),
    new ProgressBarPlugin({
      format: chalk.green('打包中 [:bar] :current/:total :percent :elapseds :msg'),
      complete: '●',
      incomplete: '○',
      width: 20
    })
  ]
})

module.exports = config