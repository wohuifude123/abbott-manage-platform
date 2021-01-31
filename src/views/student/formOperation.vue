<template>
  <div class="form-container">
    <div class="btn-container">
      <el-button type="primary" @click="addFormRow">添加表格</el-button>
    </div>
    <div
            v-for="(itemDiv, indexDiv) in divFormList"
            :key="'divForm' + indexDiv"
            :class="{ 'div-form-container':true, 'mt10':false}"
    >
      <div class='form-delete-container'>
        <el-button
                icon='el-icon-delete'
                size='small'
                @click="deleteDiv(indexDiv, itemDiv)"
        >
          {{indexDiv}}
        </el-button>
      </div>
      <el-form
              style="margin-top: 5px"
              :label-position="labelPosition"
              ref="form"
              :model="form"
              label-width="80px">
        <el-row
                v-for="(itemRow, indexRow) in itemDiv"
                :key="'row' + indexRow"
        >
          <el-col :span="12" v-for="(item, index) in itemRow" >
            <el-form-item
                    :label="item.description"
                    :key="index"
                    style="box-sizing: border-box;padding-right: 5px"
            >
              <el-input :key="'input'+index" v-if="item['showType']==='input'" v-model="item.name" size="small"></el-input>
              <el-select
                      v-else-if="item['showType'] === 'select'"
                      v-model="item['value']" placeholder="请选择"
              >
                <el-option
                        v-for="itemSelect in item['options']"
                        :key="itemSelect.value"
                        :label="itemSelect.label"
                        :value="itemSelect.value">
                </el-option>
              </el-select>

              <el-time-select
                      v-else-if="item['showType'] === 'time'"
                      timeSelect
                      v-model="item['timeValue']"
                      :picker-options="item['options']"
                      size="small"
                      placeholder="选择时间">
              </el-time-select>

              <el-date-picker
                      v-else-if="item['showType'] === 'date'"
                      v-model="item['valueDatePicker']"
                      type="date"
                      placeholder="选择日期">
              </el-date-picker>

              <el-input-number
                      v-else-if="item['showType'] === 'inputnumber'"
                      v-model="item['num']"
                      :min="1"
                      :max="10"
                      size="small"
                      label="描述文字">
              </el-input-number>
              <span v-else>{{item['showType']}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

  </div>
</template>

<script>
import GridJson from './mockData/grid.json'
export default {
  name: "formOperation",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      divFormList: [ // divFormList
        [ // itemDiv
          [ // itemRow
            {
              "columnAttrList": [],
              "showType": "input",
              "attrList": [],
              "sysEventList": [],
              "sysRule": {},
              "dataSourceType": null,
              "dataSource": null,
              "name": "zhuanye",
              "model": "field_1611043120000_63863",
              "type": "field",
              "icon": "icon-input",
              "key": "1611043120000_63863",
              "width": "100%",
              "defaultValue": null,
              "attrObject": {},
              "sysAttrList": [],
              "eventList": [],
              "description": "专业123",
              "componentType": "文本输入框"
            },
            {
              label: "活动名称2",
              name: "",
              description: "活动描述2"
            }
          ],
          [
            {
              label: "活动名称3",
              name: "",
              description: "活动描述3"
            },
            {
              label: "活动名称4",
              name: "",
              description: "活动描述4"
            }
          ],
          [
            {
              label: "活动名称5",
              name: "",
              description: "活动描述5"
            }
          ]
        ]
      ],
      divFormStyle: true,
      mt10: true,
      sysGridFieldList: [],
      labelPosition: 'right',
      sysWidgetSelected: {},
      sysGridFieldAdd: []
    }
  },
  mounted () {
    const _this = this

    console.log('_this.divFormList == ', _this.divFormList)

    let sysWidgetSelected = GridJson.sysWidgetList[0]

    let divFormListItem = _this.handleArrayByColumn(sysWidgetSelected.sysGridFieldList, 2)
    // console.log('divFormListItem == ', divFormListArr)

    _this.$set(_this.divFormList, 0, divFormListItem)


    _this.sysGridFieldAdd = divFormListItem
    // console.log('_this.divFormList == ', _this.divFormList)

  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    addFormItem () {

    },
    handleArrayByColumn (data, num) {
      if(Array.isArray(data)) {
        let rowNum = Math.ceil(data.length/num)
        console.log('is array == ', rowNum)
        let itemDiv = []
        for(let x=0; x<rowNum; x++) {
          let rowArr = []
          for(let y=x*num; y<num+(x*num); y++) {
            if(data[y] !== undefined) {
              if(data[y]['showType']=== 'select') {
                data[y]['options'] = [
                  {
                    value: '选项1',
                    label: '选项1'
                  },
                  {
                    value: '选项2',
                    label: '选项2'
                  },
                  {
                    value: '选项3',
                    label: '选项3'
                  }
                ];
              }
              if (data[y]['showType']=== 'input') {
                data[y]['inputValue'] = data[y]['description'];
              }
              if (data[y]['showType']=== 'inputnumber') {
                data[y]['num'] = 1;
              }

              if (data[y]['showType']=== 'date') {
                data[y]['valueDatePicker'] = '';
              }

              if (data[y]['showType']=== 'time') {
                data[y]['timeValue'] = '';
                data[y]['options'] = {
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }
              }
              rowArr.push(data[y])
            }
          }
          itemDiv[x] = rowArr
        }
        console.log('itemDiv == ', itemDiv)
        return itemDiv
      } else {
        // console.log('is not array')
      }
    },
    addFormRow () {
      const _this = this
      // console.log('divFormListItem == ', divFormListArr)
      _this.divFormList.push(_this.$ObjectHelper.deepClone(_this.sysGridFieldAdd))
    },
    deleteDiv (index, item) {
      const _this = this
      console.log('index == ', index)
      console.log('item == ', item)
      _this.divFormList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-container {
    padding: 20px;
  }
  .div-form-container {
    /*background: fuchsia;*/
  }
  .form-delete-container {
    width: 80px;
    text-align: right;
    vertical-align: middle;

    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .mt10 {
    margin-top: 10px;
    /*background: fuchsia;*/
  }
</style>

