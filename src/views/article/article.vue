<template>
  <div>
    <el-table
            ref="multipleTable"
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            :key="itemKey"
            row-key="id"
            :height="tableHeight"
            @selection-change="handleSelectionChange">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>

      <el-table-column
              v-for="(col, index) in cols"
              :label="col.label"
              :fixed="col.fixed"
              :key="`col_${index}`"
              :prop="dropCols[index].prop"
      >
        <template slot-scope="scope">
          <span>{{scope.row[col.prop]}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleedit(scope.$index, scope.row)">
            详情
          </el-button>
          <el-button
                  size="mini"
                  @click="handleedit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-popover placement="top" v-model="scope.row.visible">
            <p>确定要删除当前内容？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" plain @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handledelete(scope.$index, scope.row), scope.row.visible = false">确定</el-button>
            </div>
            <el-button
                    size="mini"
                    type="danger"
                    slot="reference">删除</el-button>
          </el-popover>

          <el-button
                  size="mini"
                  type="primary"
                  @click="handledefault(scope.$index, scope.row)" v-show="scope.row.defaultvalue === 0">默认</el-button>
          <el-button
                  size="mini"
                  type="primary"
                  @click="handledefault(scope.$index, scope.row)" v-show="scope.row.defaultvalue === 1">取消</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="block">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 100, 200]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getArticleList} from '@/api/article'
  import Sortable from 'sortablejs'
  export default {
    name: "Article",
    data() {
      return {
        tableData: [
          // {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // },
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }
          {
            id: 111,
            name: "刘建",
            tags: null,
            title: "vue中computer与watch区别"
          },
          {
            id: 110,
            name: "刘建",
            tags: null,
            title: "vue中computer与watch区别"
          },
          {
            id: 109,
            name: "刘建",
            tags: null,
            title: "vue中computer与watch区别"
          }
        ],
        multipleSelection: [],
        currentPage: 1, //分页索引
        pageSize: 20, // 分页展示数量
        cols: [
          {
            prop: "id",
            label: "ID",
            fixed: false
          },
          {
            prop: "name",
            label: "作者",
            fixed: false
          },
          {
            prop: "title",
            label: "标题",
            fixed: false
          }
        ],
        dropCols:[
          {
            prop: "id",
            label: "id",
            fixed: false
          },
          {
            prop: "name",
            label: "姓名",
            fixed: false
          },
          {
            prop: "title",
            label: "标题",
            fixed: false
          }
        ],
        itemKey: 0,
        tableHeight: 300
      }
    },
    mounted () {
      const _this = this
      // console.log('article mounted')

      // _this.$http.post("http://39.105.168.44:9091/user/v1/login",
      //     {
      //       "username": "woqwe123",
      //       "password": "wo7542233"
      //     },
      //     {
      //       headers:{
      //         token:"tom"
      //       }
      //     }).then(res=>{
      //   console.log('res == ', res)
      //     }).catch(function (error) {
      //   console.log('error == ', error)
      // })

      let paramsList = {
        "dataLength": 100,
        "startIndex": 0
      }

      getArticleList(paramsList).then(res=>{

        _this.handleResData(res.data)

      },err=>{
        console.log(err)
      })

    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange (val) {
        const _this = this
        // console.log(`每页 ${val} 条`);
        _this.pageSize = val
      },
      handleCurrentChange (val) {
        const _this = this
        // console.log(`当前页: ${val}`);
        this.currentPage = val
      },
      handleResData (data) {
        const _this = this
        if(data['code'] === '0001') {
          data['data'].map((item, index) => {
            _this.tableData[index] = item
          })
        }
        _this.itemKey = Math.random()
        console.log('_this.tableData == ', _this.tableData)

        _this.$nextTick(function(){

          _this.tableHeight = window.innerHeight - _this.$refs.multipleTable.$el.offsetTop - 50;
          // 监听窗口大小变化
          window.onresize = function() {
            _this.tableHeight = window.innerHeight - _this.$refs.multipleTable.$el.offsetTop - 50
          }
          _this.rowDrop()
        })
      },
      // 行拖拽
      rowDrop () {
        // 此时找到的元素是要拖拽元素的父容器
        let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
        const sortable = Sortable.create(el, {
          onEnd: (evt) => { //监听拖动结束事件
            console.log(evt.oldIndex) //当前行的被拖拽前的顺序
            console.log(evt.newIndex) //当前行的被拖拽后的顺序
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
