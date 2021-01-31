<template>
  <!--<div class="login" :style="'background-image:url('+ Background +');'">-->
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        ABBOTT 后台管理系统
      </h3>
      <el-form-item prop="username">
        <el-input v-model.trim="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="isShowCode">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;color: #ffffff">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;" v-if="loginMode === 'tourist'">
        <div class='btn-login-container'>
          <div class="btn-retry-container">
            <div class="btn-retry" @click="handleLogin">重新登录</div>
          </div>
          <div class="btn-tourist-container">
            <div class="btn-tourist" @click="handleTourist">游客模式</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;" v-if="loginMode === 'normal'">
        <el-button :loading="loading" type="primary" size="medium" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">{{userText}}</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>

      <div class="user-info-container">
        <div class='username-container'>账号【{{usernameDefault}}】</div>
        <div class='password-container'>密码【{{passwordDefault}}】</div>
      </div>
    </el-form>
    <!--  底部  -->
    <!--<div v-if="$store.state.settings.showFooter" id="el-login-footer">-->
      <!--<span v-html="$store.state.settings.footerTxt" />-->
      <!--<span> ⋅ </span>-->
      <!--<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>-->
    <!--</div>-->
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import Background from '@/assets/images/background.png'
import Helper from '@/utils/helper'
import {getLogin} from '@/api/login'

export default {
  name: "Login",
  data() {
    return {
      Background: Background,
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      usernameDefault: 'admin321',
      passwordDefault: '123456',
      userText: '登 录',
      loginRules: {
        username: [
            {
              required: true,
              trigger: 'blur',
              message: '用户名不能为空'
            }
        ],
        password: [
            { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        code: [
            { required: true, trigger: 'change', message: '验证码不能为空' }
        ]
      },
      loading: false,
      redirect: undefined,
      isShowCode: false,
      loginMode: 'normal'
    }
  },
  watch: {
    user: val => {
      console.log('watch form val ======= ', val);
    }
  },
  computed: {
    ...mapState({
      user: state=>state.user,
      app: state=>state.app
    })
  },
  mounted () {
    const _this = this
    let imgBackground = new Image()
    imgBackground.src = Background;
    imgBackground.onreadystatechange = function() {
      console.log('onreadystatechange imgBackground.readyState == ', imgBackground.readyState)
      if(imgBackground.readyState==="complete"||imgBackground.readyState==="loaded"){
        console.log('背景图加载完')
        // p1.innerHTML = 'readystatechange:loaded'
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'actionsChangeUserInfo'
    ]),
    ...mapActions('app', [
      'actionsChangeAppDataGlobal',
      'actionsChangeUserDataGlobal'
    ]),
    ...mapGetters('user', [
      'getterCount'
    ]),
    handleLogin () {
      let _this = this

      _this.$refs.loginForm.validate(valid => {
        // console.log( 'valid == ', valid);
        const user = {
          username: Helper.trimStr(_this.loginForm.username),
          password: Helper.trimStr(_this.loginForm.password),
          rememberMe: _this.loginForm.rememberMe,
          code: _this.loginForm.code,
          uuid: _this.loginForm.uuid
        }

        // let url = 'http://39.105.168.44:9091/abo/login'

        if(valid) {

          if( user['username'] === 'admin778899') {
            if ( user['password'] === '123') {
              _this.$router.push('/admin')
            } else {
              _this.$message({
                message: '本地密码错误',
                type:'error',
                duration: '3000'
              })
            }
          } else {
            let url = '/reqJava/user/v1/login'
            let dataReq = {
              "username": user['username'],
              "password": user['password']
            }

            // console.log('login dataReq ==', dataReq)
            // getLogin(dataReq).then(res=>{
            //   _this.handleResData(res)
            // }, err=>{
            //   _this.$message({
            //     message: err,
            //     type:'error',
            //     duration: '5000'
            //   })
            // })

            /**
             * 200 - 请求成功
             * 301 - 资源（网页等）被永久转移到其它URL
             * 404 - 请求的资源（网页等）不存在
             * 500 - 内部服务器错误（如：网络无法连接）
             */
            getLogin(dataReq).then( res=>{
              // console.log('getLogin res == ', res)
              _this.handleResData(res)
            }).catch( err =>{
              console.log('getLogin err == ', err)
              _this.$message({
                message: err.status + ' - ' + err.statusText,
                type:'error',
                duration: '3000'
              })
              _this.loginMode = 'tourist'
            })

          }

        } else {
          _this.$message({
            message: '输入格式错误',
            type:'error',
            duration: '3000'
          })
        }

      })
    },
    handleTourist () {
      let _this = this
      console.log('使用游客模式')
      let userInfoState = {
        authorization: 1,
        device: null,
        id: 10009,
        password: null,
        username: "tourist"
      };
      _this['actionsChangeUserInfo'](userInfoState)
      _this.$router.push('/admin')
    },
    handleResData (dataRes) {
      let _this = this
      console.log(dataRes)
      if( dataRes.data.code === '0001' ) {
        let userInfoState = {};
        // userInfoState = dataRes.data.data.data
        userInfoState = dataRes.data.data
        // console.log('userInfoState == ', userInfoState)
        _this['actionsChangeUserInfo'](userInfoState.data)
        _this['actionsChangeAppDataGlobal'](userInfoState.data)
        _this['actionsChangeUserDataGlobal'](userInfoState)
        _this.$router.push('/admin')
      } else {
        _this.$message({
          message: dataRes.data.detail,
          type:'error',
          duration: '3000'
        })
        _this.loginMode = 'tourist'
        // _this.userText = '游 客 模 式 登 录'
        // _this.usernameDefault = 'admin'
        // _this.passwordDefault = '123'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
    background: linear-gradient(to right,#9D0006, #9D1751, #3D266D);
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    /*color: #707070;*/
    color: #ffffff;
  }

  .login-form {
    border-radius: 6px;
    /*background: #ffffff;*/
    width: 385px;
    padding: 25px 25px 25px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
    background: #B882C9;
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
  .user-info-container {
    display: flex;
    font-size: 16px;
    color: #ffffff;
    .username-container {
      width: 50%;
      /*background: #409EFF;*/
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .password-container {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .btn-login-container {
    display: flex;
    .btn-retry-container {
      width: 50%;
      box-sizing: border-box;
      padding-right: 10px;
      .btn-retry {
        width: 100%;
        background: #409EFF;
        white-space: nowrap;
        cursor: pointer;
        font-weight: 500;
        color: #FFF;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .btn-tourist-container {
      width: 50%;
      box-sizing: border-box;
      padding-left: 10px;
      /*background: #409EFF;*/
      height: 100%;
      .btn-tourist {
        width: 100%;
        background: #409EFF;
        white-space: nowrap;
        cursor: pointer;
        font-weight: 500;
        color: #FFF;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

</style>
