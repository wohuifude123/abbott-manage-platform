<template>
  <div class="widget-form-container">
    <div v-if="data.list.length == 0" class="form-empty">从左侧拖拽来添加字段</div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <draggable
              class=""
              v-model="data.list"
              v-bind="{group: 'people', ghostClass: 'ghost', animation: 200, handle: '.drag-widget'}"
              @add="handleWidgetAdd"
              @change="draggableChange">
        <transition-group
                name="fade" tag="div" class="widget-form-list widget-hidden"
                v-bind:key=""
        >
          <template v-for="(element, index) in data.list">
            <!-- 栅格化 -->
            <template v-if="element.type == 'grid'">
              <widget-form-item v-if="element && element.key" :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
            </template>
            <!-- 子表单 -->
            <template v-else-if="element.type == 'childTable'">
              <child-table
                      v-if="element && element.key"
                      :key="element.key"
                      :element="element"
                      :select.sync="selectWidget"
                      :table="element"
                      :tableColumnSelect="selectWidget"
                      :index="index"
                      :data="data"
                      @updateColumnSelect="updateColumnSelect"
              >
              </child-table>
            </template>
            <template v-else>
              <widget-form-item v-if="element && element.key" :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import WidgetFormItem from './WidgetFormItem'
  import CustomForm from './LayoutCustomForm/CustomForm'
  import ChildTable from './LayoutChildTable/ChildTable'
  export default {
    name: 'WidgetForm',
    props: ['data', 'select', 'advanceComponents', 'basicComponents'],
    data () {
      return {
        selectWidget: this.select
      }
    },
    components: {
      Draggable,
      WidgetFormItem,
      CustomForm,
      ChildTable
    },
    watch: {
      'data.list' (newVal, oldVal) {
        console.log('data.list newVal == ', newVal);
      },
      select (val) {
        console.log('select val == ', val)
        this.selectWidget = val
      },
      selectWidget: {
        handler (val) {
          this.$emit('update:select', val)
        },
        deep: true
      }
    },
    mounted () {
      let _this = this
      console.log('WidgetForm mounted data == ', _this.data)

    },
    methods: {
      handleWidgetAdd (evt) {
        let _this = this
        console.log('handleWidgetAdd')
        const newIndex = evt.newIndex
        const to = evt.to

        console.log('newIndex == ', newIndex)

        //为拖拽到容器的元素添加唯一 key
        const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
        _this.$set(this.data.list, newIndex, {
          ..._this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options
          },
          key, // 绑定键值
          model: this.data.list[newIndex].type + '_' + key,
          rules: []
        })

        if( _this.data.list[newIndex].type === 'form' ) {
          console.log('移动表单了')
        }

        this.selectWidget = this.data.list[newIndex]
      },
      draggableChange (evt) {

      },
      updateColumnSelect () {

      }
    }
  }
</script>

<style scoped>
  .widget-form-container {
    /*background: #409EFF;*/
  }
</style>
