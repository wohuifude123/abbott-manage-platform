<template>
  <div>
    <Table
            :tableData="tableData"
            :data.sync="selectWidget"
            :select.sync="selectWidget"
    ></Table>
  </div>
</template>

<script>
import Table from './Table'
export default {
  name: "WidgetForm",
  props: ['select', 'data', 'tableData'],
  components: {
    Table
  },
  data() {
    return {
      selectWidget: this.select
    }
  },
  watch: {
    select (val) {
      console.log('******* WidgetForm ******** select == ', this.select)
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        // console.log('*************** WidgetForm select', this.select)
        console.log('*************** selectWidget select == ', this.select)
        console.log('*************** selectWidget val == ', val)
        // this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
