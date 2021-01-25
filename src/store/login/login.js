let state = {
    //是否登录判断
    islogin: ''
}
let mutations = {
    login: (state, info) => {
        //传入登录状态islogin
        let islogin = JSON.parse(info);
        localStorage.setItem('islogin', JSON.stringify(islogin));
        console.log(islogin, "islogin");
        state.islogin = islogin;
    }
}
export default {
    state: state,
    mutations
}