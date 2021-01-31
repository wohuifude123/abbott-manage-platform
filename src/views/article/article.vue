<template>
  <div class="article-table-container">
    <el-table
            v-loading="articleLoading"
            ref="multipleTable"
            :data="tableData.slice((pagination.currentPage-1)*pagination.size, pagination.currentPage*pagination.size)"
            style="width: 100%"
            :key="itemKey"
            row-key="id"
            :height="tableHeight"
            border
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
                  type="primary"
                  size="mini"
                  @click="openDetail(scope.$index, scope.row)">
            详情
          </el-button>
          <el-button
                  type="success"
                  size="mini"
                  @click="editDetail(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
                  size="mini"
                  type="danger"
                  slot="reference">原始地址</el-button>
          <el-popover placement="top" v-model="scope.row.visible">
            <p>确定要删除当前内容？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" plain @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handledelete(scope.$index, scope.row), scope.row.visible = false">确定</el-button>
            </div>

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

    <div class="article-pagination-container">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="selectionChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.sizes"
              :page-size="pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
      </el-pagination>
    </div>


    <!-- 技术文章详情弹框 -->
    <el-dialog
            title="技术文章详情"
            :visible.sync="isShowDetailDialog"
            :close-on-click-modal="false"
            @close="closeDetailDialog"
    >
      <el-form label-width="140px" :model="ruleForm" ref="staffinfoForm">
        <el-form-item class="first" label-width="0" prop="name">
          <div style="display: flex;">
            <el-tag class="detail-tag-container">标题</el-tag>
            <template v-if="mode.type === 1">
              <el-input placeholder="" v-model='ruleForm.title'></el-input>
            </template>
            <template v-else>
              <div class='detail-text' v-text="ruleForm.title"></div>
            </template>

          </div>
        </el-form-item>
        <el-form-item label-width="0" class="first" prop="price">
          <div style="display: flex;">
            <el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">用户</el-tag>
            <el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm["user"]'></el-input>
          </div>
        </el-form-item>

        <el-form-item label-width="0" class="first" prop="quantityCount">
          <div style="display: flex;">
            <el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">内容</el-tag>
            <el-input type="textarea" :rows="8" placeholder="" class="inputmoom" v-model='ruleForm.content'></el-input>
          </div>
        </el-form-item>

        <div class="first" v-if="mode.type === 1">
          <div style="width: 100%;display: flex;justify-content: center">
            <el-button type="primary" @click="saveNewArticleInfo">保存</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getArticleList, postArticleDetail, editArticleDetail} from '@/api/article'
import Sortable from 'sortablejs'
import Config from '@/config/config'

export default {
  name: "Article",
  data() {
    return {
      tableData: [
        // {
        //   id: 111,
        //   name: "刘建",
        //   tags: null,
        //   title: "vue中computer与watch区别"
        // },
        // {
        //   id: 110,
        //   name: "刘建",
        //   tags: null,
        //   title: "vue中computer与watch区别"
        // },
        // {
        //   id: 109,
        //   name: "刘建",
        //   tags: null,
        //   title: "vue中computer与watch区别"
        // }
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
          prop: "title",
          label: "标题",
          fixed: false
        },
        {
          prop: "userID",
          label: "作者",
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
      tableHeight: 350,
      pagination: {
        sizes: [20, 50, 100, 500],
        total: 100,
        currentPage: 1,
        size: 20
      },
      articleLoading: true,
      ruleForm: {
        id: null,
        title: "",
        user: "",
        content: ""
      },
      isShowDetailDialog: false,
      mode: {
        type: 0,
        name: '编辑'
      },
      reqParams: {
        start: 0,
        times: 5, // 倍数
        dataLength: 100
      }
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

    _this.loadListData()

    // getArticleList(paramsList).then(res=>{
    //   _this.handleResData(res.data)
    // },err=>{
    //   console.log(err)
    // })

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
      _this.pagination.size = val
    },
    handleCurrentChange (val) {
      const _this = this
      console.log(`当前页: ${val}`);
      _this.pagination.currentPage = val
      if(val> (_this.reqParams.start/_this.pagination.size) + _this.reqParams.times) {
        _this.reqParams.start = _this.reqParams.start + (_this.reqParams.times * _this.pagination.size)
        _this.loadListData()
      }
    },
    selectionChange (val) {
      const _this = this
      console.log('selectionChange == ', val)
    },
    handleResData (data) {
      const _this = this
      console.log('data == ', data)
      if(data['code'] === '0001' || data['code'] === '200') {
        data['data']['data'].map((item, index) => {
          // _this.tableData[index] = item
        })
        _this.tableData.push(...data['data']['data'])
        // _this.pagination.total =  data['data']['count']
      }
      _this.pagination.total = data['data']['count']

      _this.itemKey = Math.random()
      console.log('_this.tableData == ', _this.tableData)

      _this.articleLoading = false
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
    },
    openDetail (index, row) {
      const _this = this
      console.log('index == ', index)
      console.log('row == ', row)
      _this.mode.type = 0
      // _this.ruleForm = {
      //   title: row.title,
      //   user: row.name
      // }
      _this.getDetailData(index, row);
      // _this.isShowDetailDialog = true

    },
    editDetail (index, row) {
      const _this = this
      console.log('index == ', index)
      console.log('row == ', row)
      _this.mode.type = 1

      _this.getDetailData(index, row);

      // _this.sendChangeInfo(data)
    },
    closeDetailDialog() {

    },
    changeMode () {
      const _this = this
      if(_this.mode.type === 0) {
        _this.mode = {
          type: 1,
          name: '保存'
        }

      } else if(_this.mode.type === 1) {
        _this.mode = {
          type: 0,
          name: '编辑'
        }
      }
    },
    saveNewArticleInfo () {
      const _this = this
      // console.log(_this.ruleForm)
      let data = {
        "id": _this.ruleForm.id,
        "title": _this.ruleForm.title,
        "userID": parseInt(_this.ruleForm.user),
        "content": _this.$ObjectHelper.handleTextareaValue(_this.ruleForm.content)
      }

      console.log('data == ', data)
      editArticleDetail(data)
          .then(function (response) {
            console.log(response);
            if (response.data.code === "200" ||
                response.data.code === "0001") {
              _this.$message({
                message: response.data.detail,
                type: 'success',
                duration: 3000
              })
              _this.isShowDetailDialog = false
              _this.refreshTable()

              // _this.resetForm('ruleForm')
              // _this.titleAddUser = `新增用户账号【${response.data.username}】姓名【${response.data.name}】`
            } else {
              _this.$message({
                message: response.data.detail,
                type: 'warning',
                duration: 3000
              })
            }
            _this.loadingSubmit = false
          })
          .catch(function (error) {
            console.log(error);
            _this.loadingSubmit = false
          });

    },
    loadListData () {
      const _this = this
      let paramsArticleList = {
        params: {
          ..._this.reqParams
        }
      }

      console.log('paramsArticleList == ', paramsArticleList)
      // _this.$http.get('/reqJava/v1/technologyArticle', {
      //   params: paramsArticleList
      // }).then(res=>{
      //   _this.handleResData(res.data)
      // },err=>{
      //   console.log(err)
      // })
      getArticleList(paramsArticleList).then(res=>{
        console.log('res == ', res)
        _this.handleResData(res.data)
      },err=>{
        console.log(err)
      })
    },
    getDetailData(index, row) {
      const _this = this
      // _this.ruleForm = {
      //   id: row.id,
      //   title: row.title,
      //   user: row.name
      // }
      let data = {
        "id": row.id,
      }
      postArticleDetail(data)
          .then(function (response) {
            let dataRes = response.data
            if (dataRes.code === "200" ||
                dataRes.code === "0001") {
              _this.ruleForm = {
                id: dataRes.data.id,
                title: dataRes.data.title,
                user: dataRes.data.userID,
                content: _this.$ObjectHelper.handleDatabaseValue(dataRes.data.content)
              }
              _this.isShowDetailDialog = true
            } else {

            }

          })
          .catch(function (error) {

          });
    },
    refreshTable () {
      const _this = this
      _this.loadListData()
    }
  }
}
</script>

<style scoped>
  .article-table-container {
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
  }
  .article-pagination-container {
    display: flex;
    /*background: fuchsia;*/
    justify-content: center;
  }

  .detail-tag-container {
    height: 40px;
    margin-right: 10px;
    line-height: 40px;
    font-size: 14px
  }

  .detail-text {
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #409EFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    width: 100%;
    padding: 0 15px;
  }
</style>
