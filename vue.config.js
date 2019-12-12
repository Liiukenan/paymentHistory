const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.express = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/static/' : './',
    devServe: {
    port: 8080,
    // disableHostCheck:true,//处理host不识别问题
    },
    baseUrl: '/', //基本路径，不要随意更改
    outputDir: process.env.outputDir, // 打包生成目录
    assetDir: 'static',
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map
    configureWebpack: config => {
        // 为生产环境修改配置
        config.plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true,  //生产环境自动删除console
                    },
                    warnings: false,
                },
                sourceMap: false,
                parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
            })
        );
    }
    
    }