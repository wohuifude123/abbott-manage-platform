<template>
  <div class="user-add-container">
    <el-header style="display: flex;align-items: center; border: 1px solid #409EFF; box-sizing: border-box;
        justify-content: center; font-size: 20px; background: #ffffff; margin-bottom: 22px">
      {{titleAddUser}}
    </el-header>
    <el-form :model="userInfo" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
              prop="urlReq"
              label-width="0">
        <div style="display: flex;">
          <el-tag style="position: absolute; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #f56c6c; color: #ffffff">请求地址</el-tag>
          <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 120px">
            <el-input type="text" placeholder="输入请求地址" class="input-point-name" v-model.trim='userInfo.urlReq'></el-input>
          </div>
        </div>
      </el-form-item>
      <div style="display: flex; width: 100%">
        <div style="width: 50%; box-sizing: border-box;padding-right: 5px;">
          <el-form-item
                  prop="phone"
                  label-width="0"
          >
            <el-tag style="position: absolute; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #f56c6c; color: #ffffff">用户名称</el-tag>
            <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 120px">
              <el-input v-model.trim="userInfo.phone" placeholder="输入用户名称"></el-input>
            </div>
          </el-form-item>
        </div>
        <div style="width: 50%">
          <el-form-item
                  class="pass"
                  prop="password"
                  label-width="0"
                  :rules="[
                              { required: true, message: '请输入用户密码', trigger: 'blur' },
                              ]"
          >
            <el-tag style="position: absolute; left: 5px;  background: #f56c6c;
                        width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; color: #ffffff">
              用户密码</el-tag>
            <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 125px">
              <el-input :type="typePassword" v-model.trim="userInfo.password" placeholder="输入用户密码">
                <%-- input中加图标必须要有slot="suffix"属性，不然无法显示图标 --%>
                <i slot="suffix" :class="iconPassword" @click="showPassword"></i>
              </el-input>
            </div>

          </el-form-item>
        </div>
      </div>

      <div style="display: flex; width: 100%">
        <div style="width: 50%; box-sizing: border-box;padding-right: 5px;">
          <el-form-item
                  class="pass"
                  label-width="0"
          >
            <el-tag style="position: absolute; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #409EFF; color: #ffffff">
              姓名</el-tag>
            <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 120px">
              <el-input v-model.trim="userInfo.username" placeholder="输入真实姓名"></el-input>
            </div>

          </el-form-item>
        </div>
        <div style="width: 50%">
          <el-form-item
                  class="pass"
                  prop="value"
                  label-width="0"
          >
            <el-tag style="position: absolute; left: 5px; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #409EFF; color: #ffffff">
              性别</el-tag>
            <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 125px">

              <template>
                <el-radio v-model="userInfo.sex" label="0">男</el-radio>
                <el-radio v-model="userInfo.sex" label="1">女</el-radio>
              </template>
            </div>

          </el-form-item>
        </div>
      </div>

      <div style="display: flex; width: 100%">
        <div style="width: 50%; box-sizing: border-box;padding-right: 5px;">
          <el-form-item
                  class="pass"
                  label-width="0"
          >
            <el-tag style="position: absolute; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #409EFF; color: #ffffff">
              微信</el-tag>
            <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 120px">
              <el-input v-model.trim="userInfo.weChat" placeholder="输入微信"></el-input>
            </div>
          </el-form-item>
        </div>
        <div style="width: 50%">
          <el-form-item
                  class="pass"
                  label-width="0"
          >
            <el-tag style="position: absolute; left: 5px; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #409EFF; color: #ffffff">
              QQ</el-tag>
            <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 125px">
              <el-input v-model.trim="userInfo.qq" placeholder="输入QQ"></el-input>
            </div>
          </el-form-item>
        </div>
      </div>

      <el-form-item label-width="0">
        <div style="display: flex;">
          <el-tag style="position: absolute; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #f56c6c; color: #ffffff">
            操作权限</el-tag>
          <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 120px">
            <el-input type="text" placeholder="输入操作权限" class="input-point-name" v-model.trim='userInfo.operator'></el-input>
          </div>
        </div>
      </el-form-item>

      <el-form-item label-width="0">
        <div style="display: flex;">
          <el-tag style="position: absolute; width: 110px;height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px; background: #f56c6c; color: #ffffff">
            TOKEN</el-tag>
          <div style="width: 100%; height: 40px;box-sizing: border-box; padding-left: 120px">
            <el-input type="text" placeholder="输入TOKEN" class="input-point-name" v-model.trim='userInfo.token'></el-input>
          </div>
        </div>
      </el-form-item>

      <el-form-item label-width="0">
        <div style="display: flex; justify-content: center">
          <div style="width: 30%">
            <el-button :loading="loadingSubmit" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
            <el-button @click="resetForm('ruleForm')" class="reset">重 置</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Axios from 'axios';
import { isValidPhone, validateURL } from "@/utils/validate.js";
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  props:[''],
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    let validPhone = (rule, value,callback)=>{
      if (value === ''){
        callback()
        // callback(new Error('请输入电话号码'))
      } else {
        if (!isValidPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        } else {
          callback()
        }
      }
    }

    let validUrl = (rule, value,callback)=>{
      if (!value){
        callback(new Error('请输入url地址'))
      }else if (!validateURL(value)){
        callback(new Error('请输入正确的url地址'))
      }else {
        callback()
      }
    }

    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validPhone, trigger: 'blur'}
        ],
        urlReq: [
          { required: true, validator: validUrl, trigger: 'blur'}
        ]
      },
      userInfo: {
        phone: "",
        password: "123456",
        username: "",
        sex: "0",
        weChat: "",
        qq: "",
        operator: "",
        token: "",
        urlReq: ''
      },
      iconPassword: "el-input__icon el-icon-view",
      typePassword: "password",
      loadingSubmit: false,
      titleAddUser: "增加用户功能"
    };
  },
  watch: {
    user: val => {
      console.log('watch addUser val ======= ', val);
    },
    app: val => {
      console.log('watch addUser app ======= ', val);
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      app: state => state.app
    })
  },
  mounted () {
    const _this = this;
    // console.log('app == ', _this.app.userDataGlobal['manageData']['urlList'])
    let userDataGlobal = _this.app.userDataGlobal
    if (userDataGlobal.hasOwnProperty('manageData')) {
      let manageData = userDataGlobal['manageData']
      if(manageData.hasOwnProperty('urlList')) {
        let urlList = manageData['urlList']
        for (let item of urlList) {
          console.log(item);
          if(item['classify'] === 'createNewUser') {
            _this.userInfo.urlReq = item['url']
            _this.userInfo.operator = item['operator']
            _this.userInfo.token = item.token
          }
        }
      }
    }
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      console.log('formName == ', formName)
      _this.$refs[formName].validate((valid) => {
        console.log('valid == ', valid)
        if (valid) {
          _this.loadingSubmit = true
          // alert('submit!');
          _this.insertUserInfo(formName)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    insertUserInfo(dataReq) {
      const _this = this;
      // console.log('dataReq == ', dataReq)
      console.log('_this.urlReq == ', _this.userInfo.urlReq)
      console.log('_this.userInfo == ', )

      let url = _this.userInfo.urlReq;

      let data = {
        "phone": _this.userInfo.phone,
        "password": _this.userInfo.password,
        "username": _this.userInfo.username,
        "sex": _this.userInfo.sex,
        "weChat": _this.userInfo.weChat,
        "qq": _this.userInfo.qq,
        "operator": _this.userInfo.operator,
        "token": _this.userInfo.token
      }

      // console.log('data == ', data)


      const axiosAddInstance = Axios.create({
        baseURL: '',
        timeout: 1000 * 12, // 创建axios实例,设定超时时间是12s
        withCredentials: false, // 是否允许携带cookie
        headers: {
          "Content-Type": "application/json"
        }
      })

      axiosAddInstance({
        url: `${url}`,
        method: "post",
        data: data
      })
          .then(function (response) {
            console.log(response);
            if (response.data.code === "200" ||
                response.data.code === "0001") {
              _this.$message({
                message: response.data.detail,
                type: 'success',
                duration: 3000
              })
              _this.resetForm('ruleForm')
              _this.titleAddUser = `新增用户账号【${response.data.username}】姓名【${response.data.name}】`
            } else {
              _this.$message({
                message: response.data.detail,
                type: 'warning',
                duration: 3000
              })

              if(Array.isArray(response.data.data)) {
                _this.titleAddUser = `注册过的用户账号【${response.data.data[0].phone}】uid【${response.data.data[0].uid}】`

              } else {
                if(response.data.data === undefined) {
                  if(response.data.hasOwnProperty('ps')) {
                    _this.titleAddUser = `注册过的用户账号【${response.data.ps[0].username}】uid【${response.data.ps[0].uid}】`
                  }
                }
              }
            }
            _this.loadingSubmit = false
          })
          .catch(function (error) {
            console.log(error);
            _this.loadingSubmit = false
          });
    },
    showPassword() {
      const _this = this;
      //点击图标是密码隐藏或显示
      if( _this.typePassword === "text"){
        _this.typePassword = "password";
        //更换图标
        _this.iconPassword = "el-input__icon el-icon-view";
      } else {
        _this.typePassword = "text";
        _this.iconPassword ="el-input__icon el-icon-loading";
      };
    },
    resetForm(formName) {
      const _this = this;
      // _this.$refs[formName].resetFields();
      _this.userInfo.phone = ''
      _this.userInfo.weChat = ''
      _this.userInfo.qq = ''
      _this.userInfo.username = ''

    }
  }
}
</script>
<style lang="scss" scoped>
    .user-add-container {
        /*background: #e6a23c;*/
        box-sizing: border-box;
        padding: 10px 10px 0 10px;
    }
    .top{
        text-align:center;
    }
</style>
