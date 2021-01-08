<template>
  <el-form-item class="widget-view"
                v-if="element && element.key"
                :class="{active: selectWidget.key == element.key, 'is_req': element.options.required, 'table': element.type == 'table', 'error-active': verifiedFailedList.includes(element.key)}"
                :label="element.name"
                @click.native.stop="handleSelectWidget(index)">

    <template v-if="element.type == 'input' || element.type == 'amount' || element.type == 'website'">
      <el-input ref='input' v-model="element.options.defaultValue"></el-input>
    </template>
  </el-form-item>
</template>

<script>
  export default {
    name: "WidgetFormItem",
    props: ['element', 'select', 'index', 'data'],
    data () {
      return {
        selectWidget: this.select,
        verifiedFailedList: [],
        eventList:{},//事件集合
      }
    },
    methods: {
      handleSelectWidget (index) {

      }
    }
  }
</script>

<style scoped>

</style>
