<template>
    <div id="login">
        <div class="con">
            <!--<h1>-->
                <!--<img src="../assets/images/logo.png" alt="">-->
            <!--</h1>-->
            <div class="user">
                <header>
                    <p>用户注册</p>
                </header>
                <div class="reg">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form :model="dynamicValidateForm" ref="user" label-width="100px" class="demo-dynamic">
                            <el-form-item
                                    class="pass"
                                    prop="value"
                                    label="用户名"
                                    :rules="[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    ]"
                            >
                                <el-input v-model="dynamicValidateForm.value" ></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form-item label="密码" prop="pass" class="pass">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass" class="pass">
                            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                            <el-form-item
                                    class="pass"
                                    prop="email"
                                    label="邮箱"
                                    :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"
                            >
                                <el-input v-model="dynamicValidateForm.email" ></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm','user')">提 交</el-button>
                            <el-button @click="resetForm('ruleForm','dynamicValidateForm','user')" class="reset">重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
          },
          dynamicValidateForm: {
            value: '',
            email: ''
          }
        };
      }
    }
</script>
<style lang="scss">
    .top{
        text-align:center;
    }
</style>
