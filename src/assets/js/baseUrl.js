//配置全局访问接口地址
let BASEDEV = "http://localhost:8089/"; //开发
// let BASEDEV = "http://8.140.170.160:8089/"; //阿里云
let BASEPROD = ""; // 发布
let baseUrl = {
    BASEDEV,
    BASEPROD
}
export default baseUrl;