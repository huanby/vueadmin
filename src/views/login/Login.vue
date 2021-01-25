<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt />
    </div>
    <div>
      <!-- 页面主体START -->
      <section id="main">
        <div class="user-avator">
          <img src="../../assets/imgs/hh.gif" />
        </div>
        <h1 class="denglu">登录</h1>
        <form accept-charset="utf-8" data-view="loginView">
          <div class="clearfix" data-propertyname="username" data-controltype="Phone">
            <input v-model="username" type="text" placeholder="输入账号" />
            <span v-show="usernameWarn" class="input_warning">{{usernameMessage}}</span>
          </div>

          <div class="clearfix" data-propertyname="password" data-controltype="Password">
            <input v-model="password" type="password" placeholder="输入密码" />
            <span v-show="passwordWarn" class="input_warning">{{passwordMessage}}</span>
          </div>

          <div class="clearfix">
            <a href="javascript:;" class="forgot_pwd">忘记密码？</a>
          </div>
          <div class="clearfix btn_login" data-propertyname="submit" data-controltype="Botton">
            <input @click="login" class="submit" type="button" value="登录" />
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
export default {
  data() {
    return {
      imgSrc: require("@/assets/imgs/backimg.jpg"),
      username: "",
      usernameMessage: "",
      usernameWarn: false,
      passwordWarn: false,
      password: "",
      passwordMessage: ""
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
      // this.$axios
      //   .post(
      //     "http://127.0.0.1:8089/login",
      //     this.$qs.stringify(data)
      //   )
      //   .then(res => {
      //     console.log(res.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.$axios
        .get("http://127.0.0.1:8089/login", {
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
    }
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
  font-size: 14px;
  width: 100%;
  height: 100%;
}
a {
  background-color: transparent;
  outline: 0;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
p {
  margin: 0;
}
p + p {
  margin-top: 10px;
}
img {
  border: 0;
  vertical-align: top;
  display: inline-block;
}
button,
input,
optgroup,
select,
textarea {
  font-family: "Hiragino Sans GB", "Microsoft Yahei", SimSun, Arial;
  font-size: 14px;
  margin: 0;
  padding: 0;
  border: 1px solid #cecece;
}
button:focus,
input:focus,
optgroup:focus,
select:focus,
textarea:focus {
  outline: 0;
}
input[type="text"],
input[type="password"] {
  color: #333;
  width: 280px;
  border: 1px solid #cecece;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  padding: 12px;
  margin: 9px 0;
}
label,
select,
button,
input[type="button"] {
  cursor: pointer;
}
i {
  font-style: normal;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix {
  *zoom: 1;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
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
.input_tips {
  color: #fd5f39;
  margin-top: -3px;
  display: block;
}
.input_warning {
  color: #fd5f39;
}
#main .submit {
  border: 0;
  height: 46px;
  width: 100%;
  color: #fff;
  font-size: 16px;
  text-align: center;
  background: #3dca99;
  -webkit-border-radius: 23px;
  -moz-border-radius: 23px;
  border-radius: 23px;
  margin: 18px 0;
}
#main .btn_login {
  border-bottom: 1px solid #e3e4e5;
}
#main .autologin {
  color: #555;
  margin: 9px 3px 0 0;
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
#main .goregister a:hover {
  text-decoration: none;
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
  font-size: 14px;
  color: #555;
  text-align: center;
  width: 64px;
  margin: 0 auto 25px;
}
</style>