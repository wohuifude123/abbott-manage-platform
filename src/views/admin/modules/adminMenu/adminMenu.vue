<template>
  <div
          class="log-left-container"
          :class="{ 'log-left-spread': !isCollapse, 'log-left-collapse': isCollapse}"
  >
    <!--<div class='log-container'>ABBOTT管理系统</div>-->
    <el-scrollbar
            class="default-scroll-bar"

    >
      <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              :class="{collapseStyle: isCollapse, basicStyle: !isCollapse}"
              @select="handleSelect"
              :unique-opened="true"
              @open="handleOpen"
              @close="handleClose"
              text-color="#bfcbd9"
              active-text-color="#20a0ff"
              background-color="#324157"
              :collapse="isCollapse"
      >
        <el-menu-item index="1">
          <i class="el-icon-location"></i><span slot="title">系统首页{{isCollapse?'':'ABBOTT'}}</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-office-building"></i><span slot="title">租房信息</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-custom"></i><span slot="title">用户管理</span>
          </template>
          <el-menu-item index="3-1">
            <template slot="title">
              <i class="el-icon-menu"></i>用户查询
            </template>
          </el-menu-item>
          <el-menu-item index="3-2">
            <template slot="title">
              <i class="el-icon-menu"></i>用户增加
            </template>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-platform-eleme"></i><span slot="title">功能测试</span>
          </template>
          <el-menu-item index="4-1"><i class="el-icon-menu"></i>查询列表</el-menu-item>
          <el-menu-item index="4-2"><i class="el-icon-menu"></i>增加数据</el-menu-item>
          <el-menu-item index="4-3"><i class="el-icon-menu"></i>表格拖拽</el-menu-item>
          <el-menu-item index="4-4"><i class="el-icon-menu"></i>动态表格</el-menu-item>
          <el-menu-item index="4-5"><i class="el-icon-menu"></i>表格操作</el-menu-item>
          <el-menu-item index="4-6"><i class="el-icon-menu"></i>表单操作</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i><span slot="title">快捷操作</span>
          </template>
          <el-menu-item index="5-1"><i class="el-icon-menu"></i>创建页面</el-menu-item>
          <el-menu-item index="5-2"><i class="el-icon-menu"></i>拖拽功能</el-menu-item>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-reading"></i><span>技术分享</span>
          </template>
          <el-menu-item index="6-1">
            <i class="el-icon-menu"></i><span>文章列表</span>
          </el-menu-item>
          <el-menu-item index="6-2">
            <i class="el-icon-menu"></i><span>创建文章</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-menu"></i><span slot="title">个性定制</span>
          </template>
          <el-menu-item index="7-1">
            <i class="el-icon-menu"></i>表格定制
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="8">
          <i class="el-icon-picture"></i><span slot="title">精美图库</span>
        </el-menu-item>
        <el-menu-item index="9">
          <i class="el-icon-mic"></i><span slot="title">歌曲列表</span>
        </el-menu-item>
        <el-menu-item index="10">
          <i class="el-icon-tickets"></i><span slot="title">文档</span>
        </el-menu-item>
        <el-menu-item index="11">
          <i class="el-icon-chat-dot-square"></i><span slot="title">外链</span>
        </el-menu-item>
        <!--<el-menu-item index="8">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-location"></i><span>外链</span>-->
        <!--</template>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="8">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-location"></i><span>外链</span>-->
        <!--</template>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="8">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-location"></i><span>外链</span>-->
        <!--</template>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="8">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-location"></i><span>外链</span>-->
        <!--</template>-->
        <!--</el-menu-item>-->
      </el-menu>

    </el-scrollbar>
    <!--</el-aside>-->
  </div>
</template>

<script>
export default {
  name: "adminMenu",
  props: ['isCollapse'],
  data () {
    return {
      // isCollapse: false
      oneClass: 'bgB3D8FF'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      const _this = this;
      switch(key){
        case '1':
          console.log('首页')
          this.$router.push('/index');
          this.breadcrumbItems = ['导航一']
          this.$emit('addTopTag')
          break;
        case '2':
          console.log('租房信息')
          this.$router.push('/tenant_message')
          this.breadcrumbItems = ['导航三']
          _this.$emit('addTopTag')
          break;
        case '3-1':
          this.$router.push('/user_list')
          this.breadcrumbItems = ['用户查询']
          break;
        case '3-2':
          this.$router.push('/user_add')
          this.breadcrumbItems = ['创建用户']
          _this.$emit('addTopTag')
          break;
        case '4-1':
          this.$router.push('/studentList')
          this.breadcrumbItems = ['导航三']
          break;
        case '4-2':
          this.$router.push('/studentAdd')
          this.breadcrumbItems = ['导航三']
          break;
        case '4-3':
          this.$router.push('/tableDraggable')
          this.breadcrumbItems = ['导航三']
          break;
        case '4-4':
          this.$router.push('/studentGridContainer')
          this.breadcrumbItems = ['导航三']
          break;
        case '4-5':
          this.$router.push('/tableOperation')
          this.breadcrumbItems = ['导航三']
          break;
        case '4-6':
          this.$router.push('/formOperation')
          this.breadcrumbItems = ['导航三']
          break;
        case '5-1':
          this.$router.push('/customContainer')
          this.breadcrumbItems = ['导航三']
          break;
        case '5-2':
          this.$router.push('/partDraggable')
          this.breadcrumbItems = ['导航三']
          break;
        case '6-1':
          this.$router.push('/article')
          this.breadcrumbItems = ['导航三']
          _this.$emit('addTopTag')
          break;
        case '6-2':
          this.$router.push('/articleAdd')
          this.breadcrumbItems = ['导航三']
          _this.$emit('addTopTag')
          break;
        case '7-1':
          this.$router.push('/data_tmp')
          this.breadcrumbItems = ['导航二']
          break;
        case '8':
          this.$router.push('/gallery')
          this.breadcrumbItems = ['导航三']
          break;
        case '9':
          this.$router.push('/music')
          this.breadcrumbItems = ['导航三']
          break;
      }
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
  .log-left-container {
    height:100%;

    position: fixed;
    background: #324157;
  }

  .log-left-spread {
    /*background: #F56C6C;*/
    background: #324157;
    width: 210px;
  }

  .log-left-collapse {

  }

  .el-menu-vertical-demo {
    /*color: aqua;*/
    /*background: #909399;*/
  }
  .bgB3D8FF {
    background: #b3d8ff;
    /*color: red*/
  }
  .bgF56C6C {
    background: #F56C6C;
  }
  .index-span {

  }
  .span1 {

  }
  .basicStyle {
    /*background: blue;*/

  }
  .collapseStyle {
    /*color: #F56C6C;*/
    /*width: 500px;*/
    /*background: blue;*/
    min-height: 200px;
    width: 60px;

  }
</style>
