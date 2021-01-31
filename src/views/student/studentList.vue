<template>
  <div>
    <el-table
            :data="tableData"
            border
            style="width: 100%">
      <el-table-column
              prop="id"
              label="ID"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="age"
              label="年龄"
              width="180">
      </el-table-column>
      <el-table-column
              prop="phone"
              label="电话"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.sizes"
              :page-size="pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getStudentList, addOneStudent} from '@/api/student'

export default {
  name: "studentList",
  data() {
    return {
      tableData: [

      ],
      pagination: {
        currentPage: 1,
        sizes: [100, 200, 300, 400],
        size: 100,
        total: 500
      }
    }
  },
  mounted () {
    const _this = this
    _this.getListData(0, 100)
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getListData (start, dataLength) {
      const _this = this
      let paramStudentList = {
        url: `/v1/student?start=${start}&dataLength=${dataLength}`
      }
      getStudentList(paramStudentList).then(req=>{
        // console.log('req == ', req)
        if(req.data.code === '200') {
          _this.handleListData(req.data.data)
        }

      }).catch( err=> {
        console.log('err == ', err)
      })
    },
    handleListData (data) {
      const _this = this
      console.log('handleListData data == ', data)
      _this.tableData = data['tenant']
      _this.pagination.total = data['count']
    }
  }
}
</script>

<style scoped>

</style>
