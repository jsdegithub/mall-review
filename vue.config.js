//由于vue-cli内置的开发服务器是基于nodejs的，所以配置文件的导出规则遵循commenjs规范
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,  //如果接口跨域，需要此项配置设置为 true
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },

    lintOnSave: false,
}