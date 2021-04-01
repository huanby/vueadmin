<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <div>
      <!-- 页面主体START -->
      <section id="main">
        <div class="user-avator">
          <img src="../../assets/imgs/user.gif" />
        </div>
        <h2 class="denglu">GALE权限管理</h2>
        <form accept-charset="utf-8" data-view="loginView">
          <div class="clearfix" style="margin-bottom: 10px;">
            <el-input placeholder="请输入用户名" v-model="username" size="medium"></el-input>
            <span v-show="usernameWarn" class="input_warning">
              {{
              usernameMessage
              }}
            </span>
          </div>

          <div class="clearfix">
            <el-input placeholder="请输入密码" v-model="password" show-password size="medium"></el-input>
            <span v-show="passwordWarn" class="input_warning">
              {{
              passwordMessage
              }}
            </span>
          </div>
          <div class="clearfix" style="height:5px;"></div>
          <div class="clearfix">
             <!-- @change="alert(checked)" -->
            <el-checkbox v-model="checked" class="font-16 text-green hk-cursor">记住密码</el-checkbox>
            <a href="javascript:;" class="forgot_pwd">忘记密码？</a>
          </div>
          <div class="clearfix btn_login" data-propertyname="submit" data-controltype="Botton">
            <el-button @click="login" type="success" class="submit" round>登录</el-button>
          </div>
          <div class="clearfix goregister">
            <span class="reg_now">没有帐号？</span>
            <a href="javascript:;">注册</a>
          </div>
        </form>
      </section>
      <!-- 页面主体END -->
    </div>
  </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      imgSrc: require("@/assets/imgs/backimg.jpg"),
      username: "",
      usernameMessage: "",
      usernameWarn: false,
      passwordWarn: false,
      password: "",
      passwordMessage: "",
      checked: false
    };
  },
  watch: {
    username: function(newVal, oldVal) {
      if (newVal != "") {
        this.usernameWarn = false;
      }
    },
    password: function(newVal, oldVal) {
      if (newVal != "") {
        this.passwordWarn = false;
      }
    }
  },
  methods: {
    login() {
      if (this.username == "") {
        this.usernameWarn = true;
        this.usernameMessage = "请输入账号";
        return;
      }
      if (this.password == "") {
        this.passwordWarn = true;
        this.passwordMessage = "请输入密码";
        return;
      }

      let data = {
        username: this.username,
        password: this.password
      };

      let accountInfo = "";
      let newaccount = Base64.encode(this.username);
      let newPassord = Base64.encode(this.password);
      if (this.checked == true) {
        console.log("选择记住密码", this.checked == true);
        // 将加密后的密码存入cookie对象中
        accountInfo = newaccount + "&" + newPassord;
        // 传入账户和密码，保存5天
        this.setCookie("accountInfo", accountInfo, 1440 * 5);
      } else {
        console.log("清空cookie");
        // 清空Cookie
        this.delCookie("accountInfo");
      }
      // this.$axios
      //   .post("/api/login", this.$qs.stringify(data))
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      console.log(this.$api, "this is api port");
      this.$axios
        .get(this.$api + "login", {
          params: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status == 200) {
            //获取set-cookie
            // alert(res.headers['set-cookie']);
            // console.log(res.headers['set-cookie']);
            // console.log(document);
            // console.log(res);
            // let allCookies = document.cookie
            // alert(allCookies);
            this.$store.commit("login", true);
            this.$router.push("/");
            console.log("登录成功");
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /* 记住密码 */
    // alert(checked) {
    // alert(checked);
    // },
    // 记住密码读取信息
    getCookie(cookieName) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
          c_start = c_start + cookieName.length + 1;
          var c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    },
    // 设置cookie
    setCookie(key, data, time) {
      if (!key) {
        return;
      }
      // let expires = "Tue, 19 Jan 2038 03:14:07 GMT";
      let expires = new Date().toGMTString;
      if (time) {
        let date;
        // if (this.isType(time, "Date")) {
        if (time < 0) {
          date = new Date();
        } else {
          date = new Date();
          date.setTime(date.getTime() + time * 60000);
        }
        expires = date.toGMTString();
      }

      data = JSON.stringify(data);
      document.cookie =
        escape(key) + "=" + escape(data) + "; expires=" + expires + "; path=/";
      // doc.cookie =
      // escape(key) + "=" + escape(data) + "; expires=" + expires + "; path=/";
    },
    //删除cookie
    delCookie(c_name) {
      this.setCookie(c_name, undefined, -1);
    },
    // isType(time, date) {
    //   if ("Date" == date) {
    //     time = new Date().getTime + time * 60000;
    //     return time;
    //   }
    // },
    // 预读取cookie中用户信息
    loadAccountInfo() {
      let self = this;
      // admin%26U2FsdGVkX1+/ZtAGWFVi37gNwA7TUZmQM+yazInCPxs%3D
      let accountInfo = this.getCookie("accountInfo");
      console.log(accountInfo);
      // 如果cookie里没有账号信息
      if (Boolean(accountInfo) == false) {
        console.log("cookie中没有检测到用户账号信息！");
        return false;
      } else {
        // 如果cookie里有账号信息
        console.log("cookie中检测到账号信息！现在开始预填写！");
        let userName = "";
        let passWord = "";
        let index = accountInfo.indexOf("&");
        console.log(accountInfo);
        userName = accountInfo.substring(0, index);
        passWord = accountInfo.substring(index + 1); // 拿到加密后的密码
        // 解密
        // var bytes = Base64.decode(passWord)
        // 拿到解密后的密码（登录时输入的密码）
        this.username = Base64.decode(userName);
        this.password = Base64.decode(passWord);
        this.checked = true;
      }
    }
    /* 记住密码 */
  },
  //自动执行
  mounted() {
    //预读取cookie中用户信息
    this.loadAccountInfo();
  }
};
</script>

<style scope>
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
html {
  width: 100%;
  height: 100%;
}
#main {
  width: 306px;
  background: #fff;
  padding: 46px 80px;
  position: relative;
  left: 50%;
  top: 108px;
  margin: 0 0 108px -233px;
  z-index: 2;
}
.input_warning {
  color: #fd5f39;
}
#main .submit {
  height: 46px;
  width: 100%;
  color: #fff;
  font-size: 16px;
  text-align: center;
  background: #3dca99;
  margin: 18px 0;
}
#main .btn_login {
  border-bottom: 1px solid #e3e4e5;
}
#main .forgot_pwd {
  float: right;
  color: #3dca99;
  font-size: 12px;
  margin: 5px 0 0;
}
#main .goregister {
  margin-top: 24px;
}
#main .goregister a {
  float: right;
  padding: 3px 15px;
  border: 1px solid #3dca99;
  color: #3dca99;
  margin-top: -5px;
  -webkit-border-radius: 18px;
  -moz-border-radius: 18px;
  border-radius: 15px;
}
.user-avator {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-avator img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.denglu {
  /* font-size: 20px; */
  color: #87ad81;
  text-align: center;
}
</style>