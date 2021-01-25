module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 9999
    },
    pages:{
        index: {
          entry: 'src/main.js',
          title: '测试项目',//放要改的title名
        },
      },
}