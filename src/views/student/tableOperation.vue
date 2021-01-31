<template>
  <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%">
    <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
            :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
            prop="name"
            label="姓名"
            width="180">
    </el-table-column>
    <el-table-column
            prop="address"
            label="地址"
    >
      <template slot-scope="scope" >
        <el-button
                v-if="scope.row.address.type === 'button'"
                type="primary">主要按钮
        </el-button>
        <el-input
                v-else-if="scope.row.address.type === 'input'"
                v-model="scope.row.address.inputValue"
                placeholder="请输入内容">
        </el-input>
        <span v-else>321</span>
      </template>

    </el-table-column>
    <el-table-column
            prop="tag"
            label="标签"
    >
      <template slot-scope="scope" >
        <el-button
                v-if="scope.row.tag.type === 'button'"
                type="primary">主要按钮</el-button>
        <el-input
                v-model="scope.row.inputValue"
                v-else-if="scope.row.type === 'input'"
                placeholder="请输入内容"></el-input>
        <el-input-number
                v-else-if="scope.row.type === 'inputNumber'"
                v-model="scope.row.num"
                :min="1"
                :max="10"
                label="描述文字">
        </el-input-number>
        <el-select
                v-else-if="scope.row.type === 'select'"
                v-model="scope.row.valueSelected" placeholder="请选择">
          <el-option
                  v-for="item in scope.row.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-time-select
                v-else-if="scope.row.type === 'timeSelect'"
                timeSelect
                v-model="scope.row.timeValue"
                :picker-options="scope.row.options"
                placeholder="选择时间">
        </el-time-select>
        <el-date-picker
                v-else-if="scope.row.type === 'datePicker'"
                v-model="scope.row.valueDatePicker"
                type="date"
                placeholder="选择日期">
        </el-date-picker>
        <span v-else></span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: {
            value: '上海市普陀区金沙江路 1518 弄',
            type: 'input',
            inputValue: '上海市普陀区金沙江路 1518 弄'
          },
          tag: {
            value: '家',
            type: 'button'
          }
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: {
            value: '上海市普陀区金沙江路 1518 弄',
            type: 'button'
          },
          tag: {
            type: 'timeSelect',
            timeValue: '',
            options: {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },

        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: {
            value: '上海市普陀区金沙江路 1518 弄',
            type: 'button'
          },
          tag: {
            value: '家',
            type: 'input',
            inputValue: ''
          }
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: {
            value: '上海市普陀区金沙江路 1518 弄',
            type: 'button'
          },
          tag: {
            value: '公司',
            type: 'inputNumber',
            num: 5
          },

        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: {
            value: '上海市普陀区金沙江路 1518 弄',
            type: 'button'
          },
          tag: {
            value: '公司',
            type: 'datePicker',
            valueDatePicker: ''
          }
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: {
            value: '上海市普陀区金沙江路 1518 弄',
            type: 'button'
          },
          tag: {
            value: '公司',
            type: 'select',
            options: [
              {
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
              }],
            valueSelected: ''
          }
        }
      ]
    }
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
}
</script>

<style scoped>

</style>
