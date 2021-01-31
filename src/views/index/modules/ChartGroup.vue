<template>
  <div class='chart-group-container'>
    <chart-pie></chart-pie>
    <chart-line-shadow></chart-line-shadow>
    <chart-bar></chart-bar>
  </div>
</template>

<script>
import ChartPie from '../components/ChartPie'
import ChartLineShadow from '../components/ChartLineShadow'
import ChartBar from '../components/ChartBar'

export default {
  name: "ChartGroup",
  components: {
    ChartPie,
    ChartLineShadow,
    ChartBar
  }
}
</script>

<style scoped>
.chart-group-container {
  display: flex;
  width: 100%;
  /*background: fuchsia;*/
  box-sizing: border-box;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
