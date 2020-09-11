module.exports = {
    publicPath: './',
    outputDir: 'pay_list', 
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map
    css: {
        loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: 36
              })
            ]
          }
        }
    },

    
}