<template>
  <!--<el-table-column :prop="data.columnList ? null : data.model" :label="data.name" v-if="data.columnList">-->
  <el-table-column :label="data.name" v-if="data.columnList">
    <template slot-scope="scope">
      <template v-if="data['type']=== 'operation'">
        <el-button>按钮</el-button>
      </template>
      <template v-else>
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row[data['type']] }}</span>
      </template>
    </template>
    <student-grid v-for="column in data.columnList" :data="column"/>
  </el-table-column>
</template>

<script>
export default {
  name: "StudentGrid",
  props: ["data"],
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
