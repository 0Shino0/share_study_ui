'use strict'
const { defineConfig } = require("@vue/cli-service");
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
/* 
  pakage依赖冲突
    "html-webpack-plugin": "3.2.0",
    "script-ext-html-webpack-plugin": "2.1.3",

        "node-sass": "^4.12.0",  // npm 降级为14.20.1解决
*/

const port = process.env.port || process.env.npm_config_port || 3004 // dev port
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',

  // 配置代理
  devServer: {
    port: port,
    open: true,
    host: 'localhost',
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://120.46.214.246:8080`,
        // target: `http://116.63.165.100:8080`,
        // target: `http://localhost:10011`, // 本地测试
        // target: `http://localhost:8080`, // 本地测试
        changeOrigin: true,
        pathRewrite: {
          ['^' + 'api']: ''
        }
      }
    },
    // disableHostCheck: true
  },

  // CSS相关
  // css: {
	// 	loaderOptions: {
  //           // 给 sass-loader 传递选项
  //           sass: {
  //             // @/ 是 src/ 的别名
  //             // 注意：在 sass-loader v7 中，这个选项名是 "data"
  //             prependData: `@import "~@/styles/variables.scss"`
  //         },
  //         // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
  //         // 因为 `scss` 语法在内部也是由 sass-loader 处理的
  //         // 但是在配置 `data` 选项的时候
  //         // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
  //         // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
  //         scss: {
  //             prependData: `@import "~@/styles/variables.scss";`
  //         }
	// 	}
  // },

  
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
