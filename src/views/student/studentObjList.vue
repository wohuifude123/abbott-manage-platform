<template>
  <el-table
          :data="tableData"
          style="width: 100%"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          border
          highlight-current-row
          id="table-key"
          :row-key="(row)=>row.id.value"
          default-expand-all
  >
    <el-table-column
            label="日期"
            width="180">
      <template slot-scope="scope">
            <span>
              {{scope.row['date']['value']}}
            </span>

      </template>
    </el-table-column>
    <el-table-column
            prop="name"
            label="姓名"
            width="180">
    </el-table-column>
    <el-table-column
            prop="address"
            label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "studentObjList",
    data() {
      return {
        tableData: [
          {
            "id": {
              "type": "number",
              "value": "1"
            },
            "date": {
              "type": "text",
              "value": "2016-05-02"
            },
            "name": {
              "type": "text",
              "value": "李小虎"
            },
            "address": {
              "type": "input",
              "value": "上海市普陀区金沙江路 1518 弄"
            },
            "IsAudit": {
              "type": "select",
              "value": "number",
              "label": "数字输入框",
              "options": [
                {
                  "value": "input",
                  "label": "文本输入框"
                },
                {
                  "value": "number",
                  "label": "数字输入框"
                },
                {
                  "value": "date",
                  "label": "日期框"
                }
              ]
            },
            "sex": {
              "type": "number",
              "value": 0
            }
          },
          {
            "id": {
              "type": "number",
              "value": "2"
            },
            "date": {
              "type": "text",
              "value": "2016-05-02"
            },
            "name": {
              "type": "text",
              "value": "李小虎"
            },
            "address": {
              "type": "input",
              "value": "上海市普陀区金沙江路 1518 弄"
            },
            "IsAudit": {
              "type": "select",
              "value": "number",
              "label": "数字输入框",
              "options": [
                {
                  "value": "input",
                  "label": "文本输入框"
                },
                {
                  "value": "number",
                  "label": "数字输入框"
                },
                {
                  "value": "date",
                  "label": "日期框"
                }
              ]
            },
            "sex": {
              "type": "number",
              "value": 0
            }
          }
        ]
      }
    },
    methods: {
      handleSelectionChange () {

      }
    }
  }
</script>

<style scoped>

</style>
