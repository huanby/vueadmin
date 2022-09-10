module.exports = {
    productionSourceMap: false,
    // 配置代理
    devServer: {
        port: 9999,
        proxy: {
            '/api': {
                target: 'http://192.168.43.238:8089/',   //请求后台跨域地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'GALE权限系统', //放要改的title名
        },
    },
}