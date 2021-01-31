<template>
  <div>
    <el-select
            v-model="valueSelected"
            placeholder="请选择方式"
            @change="selectEntity"
    >
      <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
  export default {
    name: "tableSelect",
    computed: {
      ...mapState('form', {
        state: state => state
      })
    },
    data () {
      return {
        options: [
          // {
          //   value: 'table1',
          //   label: '实体0'
          // },
          // {
          //   value: 'table2',
          //   label: '实体1'
          // }
        ],
        valueSelected: ''
      }
    },
    computed: {
      ...mapState('form', {
        state: state => state
      })
    },
    mounted () {
      let _this = this
      // let url = '/test/home/other'
      // let data = {
      //   "code": "abc",
      //   "id": "123322"
      // }
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
      // _this.getServerData(paramsObj)

      // _this.options
    },
    methods: {
      ...mapActions('form', [
        'actionsReduceCount',
        'actionsAddCount',
        'actionsChangeFormSelect',
        'actionsChangeEntityFlag',
        'actionsChangeEntityName'
      ]),
      ...mapGetters('form', [
        'getterCount'
      ]),
      selectEntity (val) {
        let _this = this
        console.log('selectEntity == ', val)
        _this['actionsChangeEntityName'](val)
      },
      getServerData (data) {
        let _this = this
        let dataReq = data;
        _this.$http.post(`${dataReq.url}`,dataReq.data)
            .then(res=>{
              // console.log('res=>',res);
              _this.handleResData(dataReq.type, res)
            })
      },
      handleResData (type, data) {
        let _this = this
        console.log('type == ', type)
        if (type === 'select') {
          let options = []
          console.log(data.data.data.data)
          data.data.data.data.map((item, index)=>{
            let option = {
              value: item['tableName'],
              label: item['tableDesc']
            }
            options[index] = option
          })
          _this.options = options
        }
      }
    }
  }
</script>

<style scoped>

</style>
