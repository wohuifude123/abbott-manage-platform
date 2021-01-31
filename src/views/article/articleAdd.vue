<template>
  <div class="article-add-container">
    <div class="article-add-title">添加技术文章</div>
    <el-form :model="articleInfo" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label-width="0" prop="pass">
        <div class='form-tag-container'>
          添加文章接口
        </div>
        <div class="input-container">
          <el-input v-model.trim="articleInfo.url" autocomplete="off"></el-input>
        </div>
      </el-form-item>

      <el-form-item label-width="0" prop="pass">
        <div class='form-tag-container'>
          标题
        </div>
        <div class="input-container">
          <el-input v-model.trim="articleInfo.title" autocomplete="off"></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="0" prop="age">
        <div class='form-tag-container'>
          用户ID
        </div>
        <div class="input-container">
          <el-input v-model.number="articleInfo.userID"></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="0" prop="checkPass">
        <div class='form-tag-container'>
          内容
        </div>
        <div class="input-container">
          <el-input
                  type="textarea"
                  rows="8"
                    v-model="articleInfo.content" autocomplete="off"></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="0">
        <div class='btn-container'>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  name: "articleAdd",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
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
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      },
      articleInfo: {
        url: "",
        title: "",
        userID: "",
        content: ""
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      app: state => state.app
    })
  },
  mounted () {
    const _this = this
    let userDataGlobal = _this.app.userDataGlobal
    if (userDataGlobal.hasOwnProperty('manageData')) {
      let manageData = userDataGlobal['manageData']
      if(manageData.hasOwnProperty('urlList')) {
        let urlList = manageData['urlList']
        for (let item of urlList) {
          console.log(item);
          if(item['classify'] === 'technology') {
            _this.articleInfo.url = item['url']
          }
        }
      }
    }

  },
  methods: {
    submitForm(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        console.log('valid == ', valid)

        if (valid) {
          // alert('submit!');
          let data = {
            "title": _this.articleInfo.title,
            "content":  _this.articleInfo.content,
            "uid": _this.articleInfo.userID
          }
          _this.insertArticleData(data)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    insertArticleData (data) {
      const _this = this
      let url = _this.articleInfo.url
      _this.$http.post(`${url}`, data)
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
            }
            _this.loadingSubmit = false
          })
          .catch(function (error) {
            console.log(error);
            _this.loadingSubmit = false
          });
    }
  }
}
</script>

<style scoped>
.article-add-container {
  width: 100%;
  /*background: #F56C6C;*/
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
  .input-container {
    width: 100%;
    box-sizing: border-box;
    padding-left: 120px;
  }

  .article-add-title {
    height: 50px;
    display: flex;
    margin-bottom: 22px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background: #ffffff;
    border: 1px solid #409EFF;
    color: #409EFF;
  }

  .form-tag-container {
    position: absolute;
    left: 0;
    width: 110px;
    height: 100%;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  /deep/ .el-form-item__error {
    left: 120px;
  }

  .btn-container {
    width: 20%;
    /*background: #F56C6C;*/
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
  }
</style>
