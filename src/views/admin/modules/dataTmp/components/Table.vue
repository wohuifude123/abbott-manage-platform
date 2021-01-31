<template>
  <div class='table-container'>
    <div class="table-title-container">
      <div>标题【{{select.name}}】</div>
      <div>{{select['selectColumnIndex'] !== undefined?select['selectColumnIndex']:'未选'}}</div>
    </div>

    <el-table
            height="450"
            :data="tableData"
            style="width: 100%; margin-top: 10px" border>
      <el-table-column
              prop="date"
              label="日期"
              width="180">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  v-model="scope.row.type"
                  @click="setRowAttr(scope.$index)"
                  type="primary"
          >
            {{scope.row.type.toUpperCase()}}-{{scope.$index}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['select', 'data', 'tableData'],
  data() {
    return {
      selectWidget: this.select
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        // console.log('selectWidget val == ' + JSON.stringify(val));
        // this.$emit('update:select', val)
      },
      deep: true
    },
    "data.name": function(val) {
      console.log('val == ', val)
    }
  },
  methods: {
    setRowAttr(index) {
      const _this = this
      console.log(`setRowAttr ${index} == `, _this.selectWidget)
      this.$set(this.selectWidget, "selectColumnIndex", index);
    }
  }
}
</script>

<style scoped>
  .table-container {
    flex: 5
  }
  .table-title-container {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }


</style>
