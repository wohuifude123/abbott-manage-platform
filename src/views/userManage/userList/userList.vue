<template>
  <el-container style="padding:0">
    <el-header class="user-table-header-container">
      <!--<div class="user-table-header-title">-->
        <!--选择实体-->
      <!--</div>-->
      <div class="user-table-header-search-container">
        <div class='user-table-header-input'>
          <div style="display: flex;">
            <span class='user-input-description'>实体code：</span>
            <el-input style="width: 200px" v-model="codeValue" placeholder="请输入内容"></el-input>
          </div>
          <div style="display: flex;margin-left: 20px">
            <span class='user-input-description'>实体描述：</span>
            <el-input style="width: 200px" v-model="codeDescriptionValue" placeholder="请输入内容"></el-input>
          </div>
          <div class='entity-button-container'>
            <el-button type="primary">搜索</el-button>
            <el-button type="success">重置</el-button>
          </div>
        </div>
        <table-select></table-select>
      </div>
    </el-header>
    <el-main style="padding: 0 10px 0 10px;">
      <el-table
              ref="multipleTable"
              :data="userData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              border
      >
        <el-table-column v-if="userData.length !== 0" type="selection"></el-table-column>
        <el-table-column
                v-for="(col, index) in cols"
                :prop="col.prop"
                :label="col.label"
                :fixed="col.fixed"
                :key="index"
                style="width: 50px"
        >
          <template slot-scope="scope" v-if="scope.row[col.prop]['type']">
            <span v-if="scope.row[col.prop]['type'] === 'input' ">
              <el-input v-model="scope.row[col.prop]['value']"></el-input>
            </span>
            <span v-else-if="scope.row[col.prop]['type'] === 'select' ">
              <el-select
                      v-model="scope.row[col.prop]['value']"
                      :label="scope.row[col.prop]['label']"
              >
                <el-option
                        v-for="itemSelect in scope.row[col.prop]['options']"
                        :key="itemSelect.value"
                        :label="itemSelect.label"
                        :value="itemSelect.value"
                >
                </el-option>
              </el-select>
            </span>
            <span v-else>
              {{scope.row[col.prop]['value']}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="table-footer-container">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="100"
              :page-sizes="[10, 20, 30, 50]"
              layout="total, prev, pager, next, sizes, jumper"
              :total="400">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
  import TableSelect from './components/tableSelect'
  import UsersData from './assets/mockData/users'
  import ComponentType from './assets/mockData/componentType'
  export default {
    name: "userList",
    components: {
      TableSelect
    },
    watch: {
      getNameEntityTable (val) {
        let _this = this
        console.log('watch getNameEntityTable val == ', val)
        // _this.isShowEntityTable = val
        // let url = 'http://123.56.242.13:1314/sysTableController/getFieldList'
        let url = 'http://81.70.209.44:1314/sysTableController/getFieldList'

        let data = {
          "tableName":val
        }
        let type = 'list'

        let paramsObj = {
          url, data, type
        }
        _this.getServerData(paramsObj)
      }
    },
    computed: {
      ...mapState('form', {
        state: state => state
      }),
      getNameEntityTable () {
        let _this = this
        console.log('computed getNameEntityTable val == ')
        return _this.state.nameEntityTable;
      }
    },
    data() {
      return {
        userData: [],
        cols: [],
        formModel: {
        },
        currentPage: 1,
        tablesInfo: {

        },
        isShowTable: true,
        codeValue: '',
        codeDescriptionValue: ''
      }
    },
    mounted () {
      let _this = this
      // let url = '/test/home/other'
      // let data = {
      //   "code": "abc",
      //   "id": "123322"
      // }

      console.log('userList mounted userData == ', UsersData)
      _this.userData = UsersData.list
      _this.cols = UsersData.cols

      let url = 'http://123.56.242.13:1314/sysTableController/getEntityList'
      let data = {
        "notIncludeList":[],
        "pageNo":1,
        "pageSize":10,
        "searchContent":"",
        "description":""
      }
      let type = 'select'

      let paramsObj = {
        url, data, type
      }
      _this.getServerData(paramsObj)
    },
    methods: {
      ...mapActions('form', [
        'actionsReduceCount',
        'actionsAddCount',
        'actionsChangeFormSelect',
        'actionsChangeEntityFlag',
        'actionsChangeEntityName',
      ]),
      ...mapGetters('form', [
        'getterCount'
      ]),
      formatSex: function (row, column, cellValue, index) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      //状态改成汉字
      formatterColumn(row, column) {
        switch(row.IsAudit){
          case 0:
            return '未通过';
            break;
          case 1:
            return '审核通过';
            break;
          case 10:
            return '待审核';
            break;
          case 9:
            return '草稿';
            break;
          default:
            return '未知';
        }
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
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
        let _this = this
        // console.log('change val == ', val)
        _this.multipleSelection = val;
        _this.handleRowData(val)
      },
      selectEntity (val) {
        let _this = this
        console.log('selectEntity == ', val)
        _this['actionsChangeEntityName'](val)
        // let url = 'http://123.56.242.13:1314/sysTableController/getFieldList'
        let url = 'http://81.70.209.44:1314/sysTableController/getFieldList'
        let data = {
          "tableName":val
        }
        let type = 'list'
        let paramsObj = {
          url, data, type
        }
       this.isShowTable = false
        _this.getServerData(paramsObj)

      },
      getServerData (data) {
        let _this = this
        let dataReq = data;
        _this.$http.post(`${dataReq.url}`,dataReq.data)
            .then(res=>{
              console.log('res=>',res);
              _this.handleResData(dataReq.type, res)
            })
      },
      handleResData (type, data) {
        let _this = this
        console.log('type == ', type)
        if (type === 'select') {
          let options = []
          // console.log(data.data.data.data)
          data.data.data.data.map((item, index)=>{
            let option = {
              value: item['tableName'],
              label: item['tableDesc']
            }
            options[index] = option
          })
          _this.options = options
        } else if (type === 'list') {
          let userData = []
          let cols = []
          // console.log('list data == ', data)
          let userDataNew = []
          let columnType = new Map([
            ['fieldType', 'input'],
            ['name', 'input']
          ])
          userDataNew = data.data.data.map((item, index)=>{
            let itemNew = _this.deepClone(item)
            // console.log('list item == ', item)
            // list item ==  {name: "开始时间", model: "beginTime", fieldType: "datetime", isForeignKey: 0}
            let objItemTable = {}
            for(let keyItemTable in item) {
              let objTypeItemTable = 'text'
              if (columnType.get(keyItemTable) !== undefined) {
                objTypeItemTable = columnType.get(keyItemTable)
              }
              objItemTable[keyItemTable] =  {
                "type": objTypeItemTable,
                "value": item[keyItemTable]
              }
              objItemTable['rowType'] = {
                "type": "select",
                "value": "input",
                "label": "文本输入框",
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
              }
            }
            // userData[index] = itemNew
            console.log('objItemTable == ', objItemTable)

            if(index === 0) {
              for(let key in objItemTable) {
                let objKey = {
                  prop: key,
                  label: key.toString(),
                  width: 55
                }
                cols.push(objKey)
              }
            }

            return objItemTable
          })
          // console.log('userData == ', userData)


          console.log('cols == ', cols)

          _this.cols = cols
          console.log('objItemTable userDataNew == ', userDataNew)
          _this.userData = userDataNew

        }
      },
      deepClone(target) {
        // 定义一个变量
        let _this = this
        let result;
        // 如果当前需要深拷贝的是一个对象的话
        if (typeof target === 'object') {
          // 如果是一个数组的话
          if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
              // 递归克隆数组中的每一项
              result.push(_this.deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
          } else if(target===null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
          } else if(target.constructor===RegExp){
            result = target;
          }else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
              result[i] = _this.deepClone(target[i]);
            }
          }
          // 如果不是对象的话，就是基本数据类型，那么直接赋值
        } else {
          result = target;
        }
        // 返回最终结果
        return result;
      },
      handleRowData (val) {
        let _this = this
        // console.log('handleRowData val == ', val)
        let columnsArr = []
        val.map((item, index) => {
          // console.log('item == ', item)
          // console.log('value == ', item['IsAudit']['value'])
          // console.log( ComponentTypea[item['IsAudit']['value']] )
          if(ComponentType[item['IsAudit']['value']] !== undefined) {
            columnsArr[index] = ComponentType[item['IsAudit']['value']]
          }
        })
        console.log('columnsArr == ', columnsArr)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>
  .user-table-header-container {
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    height: 80px !important;
  }

  .user-table-header-title {
    height: 30px;
    background: #409EFF;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
    color: #ffffff;
  }
  .user-table-header-search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*background: #e6a23c;*/
    height: 50px;
  }
  .user-table-header-container {
    padding: 0 10px 0 10px;
  }
  .user-table-header-input {
    width: 200px;
  }
  .table-footer-container {
    /*background: #409EFF;*/
    display: flex;
    box-sizing: border-box;
    padding-top: 10px;
    justify-content: center;
  }

  .user-table-header-input {
    display: flex;
  }

  .user-input-description {
    font-size: 13px;
    width: 70px;
    /*background: #409EFF;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .entity-button-container {
    display: flex;
    margin-left: 20px;
  }
</style>
