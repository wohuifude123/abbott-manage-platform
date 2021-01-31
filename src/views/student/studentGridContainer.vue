<template>
  <div class='student-grid-container'>
    <div style="margin-bottom: 15px">
      <el-button type="primary" round size="small" v-for="btn in btnList">{{ btn }}</el-button>
    </div>
    <el-table style="width: 100%" :data="tableData">
      <student-grid :data="gridData"></student-grid>
    </el-table>
  </div>
</template>

<script>
import StudentGrid from './studentGrid'

export default {
  name: "studentGridContainer",
  components: {
    StudentGrid
  },
  data() {
    return {
      btnList: [
        '新增数据',
        '删除数据',
        '修改数据'
      ],
      gridData: {
        name: '我的子表格',
        columnList: [
          {
            name: '页序号',
            type: 'index',
            age: 20,
            columnList: [
              {
                name: '王子2',
                age: 20
              }
            ]
          },
          {
            name: '页名称',
            type: 'name',
            age: 30,
            columnList: [
              {
                name: '王子5',
                age: 80
              }
            ]
          },
          {
            name: '数据源',
            type: 'source',
            age: 50,
            columnList: [
              {
                name: '王子7',
                age: 90
              }
            ]
          },
          {
            name: '导入起始行',
            type: "start",
            age: 60,
            columnList: [
              {
                name: '王子7',
                age: 90
              }
            ]
          },
          {
            name: '操作',
            type: 'operation',
            age: 50,
            columnList: [
              {
                name: '王子7',
                age: 90
              }
            ]
          }
        ]
      },
      tableData: [
        {
          start: '2016-05-03',
          name: '王小虎',
          province: '上海',
          source: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          index: 200333
        },
        {
          start: '2016-05-02',
          name: '王小虎',
          province: '上海',
          source: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          index: 200333
        }
      ]
    }
  }
}
</script>

<style scoped>
.student-grid-container {
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
}
</style>
