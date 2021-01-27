<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt>
    </div>
    <div>
      <!-- 页面主体START -->
      <section id="main">
        <div class="user-avator">
          <img src="../../assets/imgs/user.gif">
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

          <div class="clearfix">
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
      //   .post("/api/login", this.$qs.stringify(data))
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