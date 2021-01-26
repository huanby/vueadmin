module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 9999,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8089/',
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