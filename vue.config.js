const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'maizuo'
        return args
      })
  },
  // 申请反向代理
  devServer: {
    proxy: {

      '/me': {
        // 在碰到/api时加上前缀拼接
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/me': ''   //把地址中这串字符替换成空字符
        }
      }
    }
  },
  configureWebpack: require("./webpack.config.js")
})


