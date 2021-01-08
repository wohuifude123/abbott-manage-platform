<template>
  <div class="chart-bar-container">
    <div class="chart-bar" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  name: "ChartBar",
  data() {
    return {

    }
  },
  mounted () {
    let _this = this
    _this.drawLine();
  },
  methods: {
    drawLine () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = _this.$Echarts.init(document.querySelector('.chart-bar'))
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#ffffff',
        angleAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a'
        }, {
          type: 'bar',
          data: [2, 4, 6, 1, 3, 2, 1],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a'
        }, {
          type: 'bar',
          data: [1, 2, 3, 4, 1, 2, 5],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a'
        }],
        legend: {
          show: true,
          data: ['A', 'B', 'C']
        }
      });
    }
  }
}
</script>

<style scoped>
  .chart-bar-container {
    flex: 1;
    margin-left: 20px;
  }
</style>
