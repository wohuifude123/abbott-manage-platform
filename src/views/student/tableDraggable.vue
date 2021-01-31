<template>
  <div class="table-drag-container">
    <el-table
            :data="tableDataList"
            style="width: 100%"
            border
            id="element-key"
            row-key="id"
            default-expand-all
    >
      <el-table-column
              label="ID"
              width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="日期"
              width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="姓名"
              width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
              label="地址"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i><span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: "tableDraggable",
  data() {
    return {
      tableDataList: [
        {
          id: '01',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: '02',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: '03',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: '04',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: '05',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: '06',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    }
  },
  mounted () {
    const _this = this
    _this.rowDrop()
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableDataList.splice(oldIndex, 1)[0]
          _this.tableDataList.splice(newIndex, 0, currRow)
        }
      })
    }
  }
}
</script>

<style scoped>
.table-drag-container {
  /*background: #409EFF;*/
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px 10px 10px;
}
</style>
