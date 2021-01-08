<template>
  <div class="chart-line-shadow-container">
    <div class="chart-line-shadow" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  name: "ChartLineShadow",
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

      var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
      var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
      var yMax = 500;
      var dataShadow = [];

      // 基于准备好的dom，初始化echarts实例
      let myChart = _this.$Echarts.init(document.querySelector('.chart-line-shadow'))
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#ffffff',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      });
    }
  }
}
</script>

<style scoped>
.chart-line-shadow-container {
  margin-left: 20px;
  flex: 1;
  box-sizing: border-box;
  /*background: #e6a23c;*/
}
</style>
