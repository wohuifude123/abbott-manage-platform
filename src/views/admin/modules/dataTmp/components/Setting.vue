<template>
  <div class='setting-container'>
    <div class='setting-wrapper'>
      <div>
        <div>输入内容部分</div>
        <!--<el-input-->
                <!--class="content-input"-->
                <!--v-model="contentInput" placeholder="请输入内容">-->
        <!--</el-input>-->
        <el-input
                class="content-input"
                v-model="widgetFormSelect.name"
                placeholder="请输入内容"
        >
        </el-input>

        <!--<template v-for="(item, index) in buttonsArr">-->
          <!--<el-button-->
                  <!--@click="setRowAttr(index)"-->
                  <!--type="primary"-->
                  <!--:key="item.index"-->
          <!--&gt;-->
            <!--主要按钮-->
          <!--</el-button>-->
        <!--</template>-->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['element','select','index','data', 'table','tableColumnSelect', 'widgetFormSelect'],
  name: "Setting",
  watch:{
    //当搜索框没有数据时，显示具体模块，同时隐藏具体模块的内容
    contentInput (newVal) {
      console.log('contentInput == ', newVal)
      // this.$emit('update:title', newValue)
    },
    "data.name": function(val) {
      console.log('val == ', val)

    },
  },
  data () {
    return {
      contentInput: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '胡小双',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      childTableData: {},
      selectWidget: this.select,
      buttonsArr: [
        {
          index: 0
        },
        {
          index: 1
        },
        {
          index: 2
        },
        {
          index: 3
        },
        {
          index: 4
        },
        {
          index: 5
        }
      ]
    }
  },
  mounted () {
    const _this = this
    console.log('mounted dataTmp Setting == ', _this.data)
    // console.log(this.$ObjectHelper.randomOneTen())
    let tableData = {}
    // tableData = _this.$ObjectHelper.handleChildTableData(_this.childTableData)
    // console.log('tableData == ', tableData)
  },
  methods: {
    setRowAttr(index) {
      const _this = this
      console.log(`setRowAttr ${index} == `, _this.selectWidget)
      // _this.$set(_this.selectWidget, "selectColumnIndex", index);
      // _this.selectWidget['selectColumnIndex'] = index
      // console.log(`setRowAttr ${index} == `, _this.selectWidget)
    }
  }
}
</script>

<style scoped>
  .setting-container {
    flex: 1;
    margin-left: 20px;
    background: #e6a23c;
  }

  .setting-wrapper {
    padding: 10px 10px 10px 10px;
  }

  .content-input {
    margin-top: 10px;
  }
</style>
