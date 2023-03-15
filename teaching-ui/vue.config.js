'use strict'
const { defineConfig } = require("@vue/cli-service");
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 3004 // dev port
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',

  devServer: {
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {

        // target: `http://localhost:8080`,

        target: `http://116.63.165.100:8080`,

//         target: `http://localhost:10011`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + 'api']: ''
        }
      }
    },
    // disableHostCheck: true
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

});
