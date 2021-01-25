module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 9999
    },
    pages:{
        index: {
          entry: 'src/main.js',
          title: 'GALE权限系统',//放要改的title名
        },
      },
}