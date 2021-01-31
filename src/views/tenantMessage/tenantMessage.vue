<template>
  <div class='table-container'>
    <div class='table-setting-container'>
      <el-row>
        <el-col :span="12">
          <div class="search-container">
            <div style="width: 50%">
              <el-select
                      :popper-append-to-body="false"
                      v-model="condition.value"
                      class="select-style"
                      popper-class="select-popper"
                      placeholder="搜索条件">
                <el-option
                        v-for="item in condition.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="width: 50%; box-sizing: border-box; padding-right: 20px">
              <el-input
                      class="search-input"
                      v-model="condition.input" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="12">

          <el-button type="primary">全部搜索</el-button>
        </el-col>
      </el-row>

    </div>
    <el-table
            :height="tableHeight"
            :data="tenantMessageData
                .slice((pagination.currentPage-1)*pagination.size, pagination.currentPage*pagination.size)"
            style="width: 100%"
            v-loading="tableLoading"
            ref="tenantTable"
            border
    >
      <el-table-column
              prop="id"
              label="ID"
              width="100">
      </el-table-column>
      <el-table-column
              prop="title"
              label="标题"
              width='300'
              :show-overflow-tooltip='true'
      >
      </el-table-column>

      <el-table-column
              prop="rental"
              label="租金"
              width="100">
      </el-table-column>

      <el-table-column
              prop="userID"
              label="用户ID"
              width="100"
      >
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="primary"
                  @click="openDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="openOriginPage(scope.$index, scope.row)">原始地址</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column>-->
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--v-model="scope.row.type"-->
      <!--@click="setRowAttr(scope.$index)"-->
      <!--type="primary"-->
      <!--&gt;-->
      <!--{{scope.row.type.toUpperCase()}}-{{scope.$index}}-->
      <!--</el-button>-->
      <!--</template>-->

      <!--</el-table-column>-->
    </el-table>
    <div class="tenant-pagination">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.totalPage">
      </el-pagination>
    </div>

    <!-- 租房详情弹框 -->
    <el-dialog
            title="租房详情"
            :visible.sync="isShowDetailDialog"
            :close-on-click-modal="false"
            @close="closeDetailDialog"
    >
      <el-form label-width="140px" :model="ruleForm" ref="staffinfoForm">
        <el-form-item class="first" label-width="0" prop="name">
          <div style="display: flex;">
            <el-tag class="detail-tag-container">标题</el-tag>
            <div class='detail-text' v-text="ruleForm.title"></div>
            <!--<el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm.title'></el-input>-->
          </div>
        </el-form-item>
        <el-form-item label-width="0" class="first" prop="price">
          <div style="display: flex;">
            <el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">租金</el-tag>
            <el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm["rental"]'></el-input>
          </div>
        </el-form-item>
        <!--<el-form-item label-width="0" class="first" prop="remark">-->
          <!--<div style="display: flex;">-->
            <!--<el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">地址</el-tag>-->
            <!--<el-input type="text" placeholder="" class="inputmoom" v-model='ruleForm.remark'></el-input>-->
          <!--</div>-->
        <!--</el-form-item>-->

        <!--<el-form-item label-width="0"  prop="commodityTypeRelationId">-->
          <!--<div style="display: flex;">-->
            <!--<el-checkbox-group v-model="ruleForm.commodityTypeRelationId" @change="handleCheckedCitiesChange">-->
              <!--<el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">内容</el-tag>-->
              <!--<el-checkbox label="送子女 " v-for='(item ,index) in ruleForm.commodityCheckedList' :label='item.value' class="sendson">{{item.name}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
          <!--</div>-->
        <!--</el-form-item>-->

        <el-form-item label-width="0" class="first" prop="quantityCount">
          <div style="display: flex;">
            <el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">描述</el-tag>

            <!--<div>-->
              <!--<span v-text="ruleForm.description"></span>-->
            <!--</div>-->

            <el-input disabled='true' type="textarea" :rows="8" placeholder="" class="inputmoom" v-model='ruleForm.description'></el-input>
          </div>
        </el-form-item>

        <div label-width="0" class="first">
          <div style="width: 100%;display: flex;justify-content: center">
            <el-button type="primary">编辑</el-button>
            <el-button>重置</el-button>
          </div>
        </div>


        <!--<el-form-item label-width="0" prop="enterpriseId">-->
          <!--<div style="display: flex;">-->
            <!--<el-tag style="height: 40px;margin-right: 10px; line-height: 40px; font-size: 14px">来源</el-tag>-->
            <!--<el-select v-model="ruleForm.enterpriseId" placeholder="请选择" style="float: left;">-->
              <!--<el-option v-for="(item, index) in ruleForm.options" :key="item.value" :label="item.label" :value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
        <!--</el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getTenantMessageList} from '@/api/tenantMessage'
import Config from '@/config/config'

export default {
  name: "tenantMessage",
  data () {
    return {
      tenantMessageData: [],
      tenantMessageOriginData: [],
      pagination: {
        currentPage: 1,
        totalPage: 100,
        pageSizes: [20, 50, 100, 500],
        size: 20
      },
      tableLoading: true,
      tableHeight: 0,
      isShowDetailDialog: false,
      condition: {
        value: '已看数据搜索条件',
        options: [
          {
            value: 'Beijing',
            label: '索引'
          },
          {
            value: 'Shanghai',
            label: '地址'
          },
          {
            value: 'Nanjing',
            label: '标题'
          }
        ],
        input: ''
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        price: 0,
        remark: '',
        commodityTypeRelationId: [],
        commodityCheckedList: [
          {
            name: '文本1',
            value: '数值1'
          },
          {
            name: '文本2',
            value: '数值2'
          },
          {
            name: '文本3',
            value: '数值3'
          }
        ],
        title: "",
        rental: 0,
        description: "",
        quantityCount: 0,
        enterpriseId: 1
      },
      rules: [
      ],
      reqParams: {
        start: 0,
        times: 5 // 倍数
      }
    }
  },
  watch: {
    'condition.input': function(val) {
      const _this = this
      _this.tenantMessageData = _this.$ObjectHelper.searchKey(
          _this.tenantMessageOriginData, 'address', _this.$ObjectHelper.trimStr(val))
    }
  },
  mounted () {
    const _this = this
    _this.loadTenantMessageList()

    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.tenantTable.$el.offsetTop - 50
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.tenantTable.$el.offsetTop - 50
      }
    })
  },
  methods: {
    handleResData (data) {
      const _this = this
      console.log('handleResData data.data == ', data.data)
      if(data.data.hasOwnProperty('tenant')) {
        // _this.tenantMessageData = data.data['tenant']
        _this.tenantMessageData.push(...data.data['tenant'])
        _this.tenantMessageOriginData.push(...data.data['tenant'])
        _this.pagination.totalPage = data.data['count']
        _this.tableLoading = false
      }
    },
    handleSizeChange(val) {
      const _this = this
      // console.log(`每页 ${val} 条`);
      _this.pagination.size = val
    },
    handleCurrentChange(val) {
      const _this = this
      console.log(`当前页: ${val}`);
      _this.pagination.currentPage = val
      if(val> (_this.reqParams.start/_this.pagination.size) + _this.reqParams.times) {
        _this.reqParams.start = _this.reqParams.start + (_this.reqParams.times * _this.pagination.size)
        _this.loadTenantMessageList()
      }
    },
    openDetail (index, row) {
      const _this = this
      console.log(index, row);
      _this.ruleForm.title = row.title
      _this.ruleForm.rental = row.rental
      _this.isShowDetailDialog = true
    },
    openOriginPage (index, row) {
      const _this = this
      // console.log(index, row);
      // console.log(row.id);
      let urlDetail = `${Config.publicUrl.houseDetail}?id=${row.id}`
      let features = ``;  //设置新窗口的特性
      // console.log(urlDetail);
      window.open(urlDetail, '_blank', features)
    },
    closeDetailDialog() {

    },
    handleCheckedCitiesChange () {

    },
    loadTenantMessageList () {
      const _this = this
      _this.tableLoading = true
      let paramsList = {
        params: {
          start: _this.reqParams.start,
          dataLength: _this.pagination.size * _this.reqParams.times
        }
      }
      getTenantMessageList(paramsList).then(res=>{
        // console.log('TenantMessageList == ', res)
        if(res.data.code === '200') {
          _this.handleResData(res.data)
        } else {
          _this.$message({
            message: res.data.code,
            type: "fail"
          })
        }
      },err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .table-container {
    background: rgb(240, 242, 245);
    /*background: #F56C6C;*/
    box-sizing: border-box;
    padding: 10px 10px 0 10px;
    height: 100%;
  }
  .table-setting-container {
    box-sizing: border-box;
    padding: 0 0 10px 0;
  }
  .search-container {
    display: flex;
  }
  .tenant-pagination {
    width: 100%;
    /*background: #409EFF;*/
    display: flex;
    justify-content: center;
    margin-top: 10px;
    height: 40px;
  }

  /deep/ .search-input .el-input__inner {
    /*height: 30px;*/
    /*margin-left: 5px;*/
  }

  /deep/ .tenant-condition .el-input__inner {
    /*height: 30px;*/
  }

  /deep/ .el-scrollbar .el-scrollbar__wrap {
    margin-bottom: 0 !important;
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
