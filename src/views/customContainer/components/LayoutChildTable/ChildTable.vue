<template>
  <div style="margin-top:20px;">
    <div style="margin-bottom:5px">
      <el-button type="primary" round @click="addTableCol">新增</el-button>
    </div>
    <el-table :ref="table.key" empty-text="请添加列数据" :id="table.key" :data="tableData" row-key="key"
              style="width: 100%" border highlight-current-row height="250"
              @row-click="rowClick"
              @current-change="handleCurrentChange"
    >
      <el-table-column prop="name" label="表头">
        <template v-if="editIndex == -1" slot-scope="scope">
          <el-input  v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型">
        <template v-if="editIndex == -1" slot-scope="scope">
          <el-select v-model="scope.row.type" placeholder="请选择组件类型" @change="(val) => {
            changeComponent(val,scope.$index,scope.row);
          }">
            <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDeleteColumn(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {basicComponents} from '../../assets/scripts/iconConfig.js'
  import Sortable from 'sortablejs';

  export default {
    props: ['table','tableColumnSelect'],
    data () {
      return {
        editIndex: -1,
        typeOptions: [{
          value: 'input',
          label: '单行文本'
        }, {
          value: 'select',
          label: '下拉框'
        },{
          value: 'number',
          label: '计数器'
        },{
          value: 'date',
          label: '日期选择器'
        },{
          value: 'time',
          label: '时间选择器'
        }],
        tableData: this.table.tableColumns,
        tableColumns:[
          {
            label: '表头',
            prop: 'title',
          },{
            label: '控件类型',
            prop: 'type'
          }],
        selectColumn: this.tableColumnSelect,
      }
    },
    methods: {
      addTableCol(){
        let defaultType = 'input';
        let componentAttr = this.getComponentAttr(defaultType);

        componentAttr.name = '列名称';

        const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
        this.$set(this.tableData, this.tableData.length, {
          ...componentAttr,
          options: {
            ...componentAttr.options,
            remoteFunc: 'func_' + key
          },
          key,
          // 绑定键值
          model: componentAttr.type + '_' + key,
          rules: []
        })
      },
      handleCurrentChange(currentRow, oldCurrentRow) {
        this.selectColumn = currentRow;
      },
      changeComponent(val,index){
        let componentAttr = this.getComponentAttr(val);
        const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
        let test = {
          ...componentAttr,
          options:{
            ...componentAttr.options,
            remoteFunc: 'func_' + key
          },
          key,
          // 绑定键值
          model: componentAttr.type + '_' + key,
          rules: []
        };
        this.tableData.splice(index,1,test);
        //选中当前行
        this.$refs[this.table.key].setCurrentRow(this.tableData[index]);
      },
      getComponentAttr(componentType){
        let componentAttr = {};
        basicComponents.forEach(function (component){
          if(component.type == componentType){
            componentAttr = JSON.parse(JSON.stringify(component));
          }
        });
        return componentAttr;
      },
      rowClick(row, column, event){
        this.selectColumn = row;
        event.stopPropagation();
        console.log(row,this.selectColumn,this.tableColumnSelect);
      },
      handleDeleteColumn(index,row){
        this.tableData.splice(index,1);
      },
      //行拖拽
      rowDrop() {
        const tbody = document.getElementById(this.table.key).querySelector('.el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
          }
        })
      },
    },
    mounted(){
      this.rowDrop();
    },
    watch: {
      table (val) {
        this.tableData = val.tableColumns
      },
      tableColumnSelect (val) {
        this.selectColumn = val
      },
      selectColumn: {
        handler (val) {
          this.$emit('updateColumnSelect', val)
        },
        deep: true
      }
    }
  }
</script>
