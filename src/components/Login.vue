<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">主题游乐园管理后台</h3>
      </div>

      <el-form-item prop="username">

        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">

        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />

      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">Login</el-button>



    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import request from '@/utils/request'
import router from '@/router';
export default {
  name: 'login',
  data() {

    return {
      loginForm: {
        username: '',
        password: ''
      },


      passwordType: 'password',
      // redirect: undefined
    }
  },
  watch: {
    $route: {
      // handler: function(route) {
      //   this.redirect = route.query && route.query.redirect
      // },
      // immediate: true
    }
  },
  methods: {

    handleLogin() {


      request.post('/user/login', this.loginForm).then((res) => {
        //把用户存入vuex
        this.$store.commit('login', res.data)
        // this.$router.push({ path:  '/home' })
        this.$router.push({ path: '/home' })
      }).catch((e) => {
        this.$message.error("登录失败")
      })


    }
  }
}
</script>



<style  scoped>
.login-container {
  /* min-height: 100vh; */
  height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}

.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
}

span :first-of-type {
  margin-right: 16px;
}



.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;
}

.title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}


.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
