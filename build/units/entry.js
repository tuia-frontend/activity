const path = require('path')
const fs = require('fs')
const env = require('./env')[process.env.NODE_ENV]
const htmlwebpackplugin = require('html-webpack-plugin')

const hasTemplate = (page) => {
  return fs.existsSync(path.join(env.containers, page + '/index.html'))
}

const getSkinPath = (skins) => {
  let skinPath = env.containers
  if (skins.length) {
    skinPath = path.join(env.containers, skins[0])
  }
  return skinPath
}

const getPages = (skins) => {
  let pages = []
  if (skins.length) {
    skins.forEach(skin => {
      pages.push(skin)
    })
  } else {
    pages = fs.readdirSync(getSkinPath(skins))
    pages = pages.slice(pages.indexOf('.DS_Store') + 1, pages.length)
  }
  
  return pages
}

// 入口js
const entries = (skins = []) => {
  const pages = getPages(skins)
  const entries = {}
  pages.forEach(item => {
    entries[item] = [path.join(env.containers, item + '/index')]
  })
  return entries
}
// 入口html
const pages = (skins = [], baseScript = []) => {
  const pages = getPages(skins)
  const htmlPlugins = []
  pages.forEach(item => {
    const template = hasTemplate(item) ? path.join(env.containers, item + '/index.html') : path.resolve(__dirname, '../../src/common/layouts/index.html')
    htmlPlugins.push(new htmlwebpackplugin({
      filename: path.resolve(__dirname, '../../dist', `${item}.html`),
      chunks: baseScript.length ? baseScript.concat([item]) : [item],
      alwaysWriteToDisk: true,
      chunksSortMode: 'manual',
      template: `html-loader!ejs-html-loader!${template}`,
      favicon: path.resolve(__dirname, '../../favicon.ico')
    }))
  })
  return htmlPlugins
}

module.exports = {
  pages,
  entries
}