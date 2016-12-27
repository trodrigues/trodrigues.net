import path from 'path'

export default {
  port: 6010,
  assetsDevPort: 6020,
  // path from root dir
  layoutTemplate: path.join(__dirname, 'index.html'),
  baseTitle: 'Website Title',
  cssModulesScopedName: '[path]___[name]__[local]___[hash:base64:5]'
}
