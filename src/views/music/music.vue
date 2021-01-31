<template>
  <div>
    <el-form>
      <el-form-item v-for="(item, index) in userList">
        <template v-if="item['type'] === 'button'">
          <el-button type="primary" round>主要按钮</el-button>
        </template>
        <template v-else-if="item['type'] === 'input'">
          <el-input
                  v-model="item.modelName"
                  placeholder="请输入内容"
                  @input.native="changeName($event, index)"
          ></el-input>
        </template>
      </el-form-item>
      <el-form-item>
        <div><i class="el-icon-edit"></i>2</div>
      </el-form-item>
      <el-form-item>
        <div><i class="el-icon-share"></i>3</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "music",
  data () {
    return {
      userList: [
        {
          name: 'ab1',
          type: 'input',
          modelName: ''
        },
        {
          name: 'ab2',
          type: 'button'
        },
        {
          name: 'ab3',
          type: 'input',
          modelName: ''
        },
      ]
    }
  },
  methods: {
    changeName: function(e,index) {
      console.log(e.target.value);//实时获取输入值
      console.log(index);//获取点击输入框的索引
    }
  }
}
</script>

<style scoped>

</style>
