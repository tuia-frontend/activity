const webpackConfig = require('./webpack.prod.config')
const webpack = require('webpack')
const chalk = require('chalk')
const path = require('path')

webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('Build complete.\n'))
})