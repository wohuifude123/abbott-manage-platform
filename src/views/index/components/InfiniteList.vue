<template>
  <div class="infinite-list">
    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
    <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
    <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
  </div>
</template>

<script>
export default {
  name: "InfiniteList",
  data () {
    return {
      count: 0
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  }
}
</script>

<style scoped>
  .infinite-list {
    /*width: 200px;*/
    height: 100%;
    /*background: #e6a23c;*/
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
    background: #ffffff;
    padding: 18px 20px 18px 20px;
  }
</style>
