module.exports = {
    publicPath: './',
    outputDir: 'hotjune', 
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        }
    }
}