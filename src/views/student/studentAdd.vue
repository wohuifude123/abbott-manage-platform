<template>
  <div class="form-container">
    <el-form label-width="140px" :model="ruleForm" :rules="rules" ref="staffinfoForm">
      <el-form-item class="first" label-width="0" prop="name">
        <div style="display: flex;">
          <el-tag type="success" style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">节点名称</el-tag>
          <el-input type="text" placeholder="必胜客300元代金券" class="inputmoom" v-model='ruleForm.name'></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="0" class="first" prop="price">
        <div style="display: flex;">
          <el-tag type="success" style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">节点属性</el-tag>
          <el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm.price'></el-input>
        </div>
      </el-form-item>
      <el-form-item label-width="0" class="first" prop="remark">
        <div style="display: flex;">
          <el-tag type="success" style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">节点描述</el-tag>
          <el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm.remark'></el-input>
        </div>
      </el-form-item>

      <el-form-item label-width="0"  prop="commodityTypeRelationId">
        <div style="display: flex;">
          <el-checkbox-group v-model="ruleForm.commodityTypeRelationId" @change="handleCheckedCitiesChange">
            <el-tag type="success" style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">节点类型</el-tag>
            <el-checkbox label="送子女 " v-for='(item ,index) in ruleForm.commodityCheckedList' :label='item.value' class="sendson">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>

      <el-form-item label-width="0" class="first" prop="quantityCount">
        <div style="display: flex;">
          <el-tag type="success" style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">节点数量</el-tag>
          <el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm.quantityCount'></el-input>
        </div>
      </el-form-item>

      <el-form-item label-width="0" prop="enterpriseId">
        <div style="display: flex;">
          <el-tag type="success" style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">节点来源</el-tag>
          <el-select v-model="ruleForm.enterpriseId" placeholder="请选择" style="float: left;">
            <el-option v-for="(item, index) in ruleForm.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getStudentList, addOneStudent} from '@/api/student'

export default {
  name: "studentAdd",
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        price: 0,
        remark: '',
        commodityTypeRelationId: [],
        commodityCheckedList: [
          {
            name: '文本1',
            value: '数值1'
          },
          {
            name: '文本2',
            value: '数值2'
          },
          {
            name: '文本3',
            value: '数值3'
          },

        ],
        quantityCount: 0,
        enterpriseId: 1,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      },
      labelPosition: 'center',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    };
  },
  mounted () {
    const _this = this
  },
  methods: {
    submitForm(formName) {

      let paramAdd = {
        "name": "聚链212",
        "age": 550
      }
      addOneStudent(paramAdd).then(data=>{
        console.log('add data == ', data)
      }).catch(err=>{

      })

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCheckedCitiesChange () {

    }
  }
}
</script>

<style scoped>
  .form-container {
    /*background: #F56C6C;*/
    box-sizing: border-box;
    padding: 10px 10px 0 10px;
    height: 100%;
  }

  /deep/ .el-form-item__label {
    /*background: #F56C6C;*/
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #F56C6C;
  }
</style>
