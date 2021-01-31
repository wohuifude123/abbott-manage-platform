<template>
  <div class="card-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 5" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "PersonalCalendar",
    data() {
      return {
        activities: [
          {
            content: '支持使用图标',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
          },
          {
            content: '支持自定义颜色',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87'
          }, {
            content: '支持自定义尺寸',
            timestamp: '2018-04-03 20:46',
            size: 'large'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
          {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          },
        ]
      };
    }
  }
</script>

<style scoped>
  .card-container {
    flex: 1;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {

    height: 100%;
  }
</style>
