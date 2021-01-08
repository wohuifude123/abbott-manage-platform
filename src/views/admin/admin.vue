<template>
  <el-container>
    <!--<el-aside width="200px" style="background: #324157">-->
    <div class="log-left-container">
      <!--<div class='log-container'>ABBOTT管理系统</div>-->
      <el-scrollbar
              class="default-scroll-bar"
      >
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                style="min-height:200px"
                @select="handleSelect"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                :unique-opened="true"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location"></i><span>系统首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>数据展示
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-document"></i>数据展示
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>用户管理
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
              <i class="el-icon-menu"></i>数据展示
            </template>
            <el-menu-item index="4-1"><i class="el-icon-menu"></i>任务列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>快捷操作
            </template>
            <el-menu-item index="5-1"><i class="el-icon-menu"></i>创建页面</el-menu-item>
            <el-menu-item index="5-2"><i class="el-icon-menu"></i>拖拽功能</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i><span>技术分享</span>
            </template>
            <el-menu-item index="6-1">
              <i class="el-icon-menu"></i><span>文章列表</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="7">
            <template slot="title">
              <i class="el-icon-location"></i><span>文档</span>
            </template>
          </el-menu-item>
          <el-menu-item index="8">
            <template slot="title">
              <i class="el-icon-location"></i><span>外链</span>
            </template>
          </el-menu-item>
          <el-menu-item index="8">
            <template slot="title">
              <i class="el-icon-location"></i><span>外链</span>
            </template>
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
    <el-main class="admin-right-main-container">
      <el-header class="admin-right-title-container">
        <div class='admin-right-navigation' style="width:100%;overflow: hidden; height: 100%">
          <span class="demonstration" style="float:left;padding-top:10px;color:white;margin-left:1%">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
          </span>
          <!--<span class="demonstration"-->
                <!--style="float:left;padding:5px;color:white;margin-left:2%;width:15%">-->
            <!--<el-input-->
                    <!--placeholder="请输入"-->
                    <!--icon="search"-->
                    <!--v-model="searchCriteria"-->
                    <!--:on-icon-click="handleIconClick">-->
            <!--</el-input>-->
          <!--</span>-->
          <span class="user-operation-container" style="float:right;">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:white">{{usernameDefault}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="logoutUser">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
        </div>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-main>
  </el-container>
</template>
<script type="text/ecmascript-6">
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      searchCriteria: '',
      breadcrumbItems: ['导航一'],
      isCollapse: false,
      usernameDefault: 'abbott.liu'
    }
  },
  watch: {
    user: val => {
      console.log('watch user val ======= ', val);
    }
  },
  computed: {
    ...mapState('user', {
      state: state => state
    })
  },
  mounted () {
    let _this = this
    // console.log('admin state == ', _this.state)
    // window.addEventListener('scroll', _this.handleScroll)
    console.log('username == ', JSON.stringify(_this.state.userInfo))
    if(_this.state.userInfo.hasOwnProperty('username')) {
      _this.usernameDefault = _this.state.userInfo.username
    } else {
      console.log('username == 无')
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev);
    },
    handleSelect(key, keyPath) {
      switch(key){
        case '1':
          console.log('Page1 导航一')
          this.$router.push('/index');
          this.breadcrumbItems = ['导航一']
          break;
        case '2-1':
          this.$router.push('/data_tmp')
          this.breadcrumbItems = ['导航二']
          break;
        case '3-1':
          this.$router.push('/user_list')
          this.breadcrumbItems = ['用户查询']
          break;
        case '3-2':
          this.$router.push('/user_add')
          this.breadcrumbItems = ['用户增加']
          break;
        case '4-1':
          this.$router.push('/task_list')
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
          break;
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleScroll() {
      console.log('handleScroll ')
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const nav = document.querySelector('.el-menu-nav')
      console.log('nav == ', nav)
      if (scrollTop >= 0 && scrollTop < 171) {
        nav.style.top = '0'
      } else {
        nav.style.top = scrollTop - 171 + 'px'
      }
    },
    logoutUser () {
      console.log('登出')
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss">
  @import './assets/styles/cover.scss';
  @import './assets/styles/index.scss';
  .content-container {
    box-sizing: border-box;
    /*background: blue;*/
    padding-right: 50px;
    overflow: hidden;
  }

  .log-left-container {
    height:100%;
    width:210px;
    position: fixed;
    background: #324157;
  }

  .admin-right-navigation {
    /*background: #e6a23c;*/
    background: #ACACAC;
  }

  .el-menu-nav {
    position: absolute;
    top: 0;
    width:210px;
    /*height: 100%;*/
  }

  .el-scrollbar__wrap{
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .el-menu-vertical-demo {
    /*position: fixed;*/
  }
  .side-bar {

  }
  .el-menu{
    border-right-width: 0;
  }
  .el-submenu .el-menu-item {
    min-width: 180px;
  }
  .admin-right-main-container {
    box-sizing: border-box;
    padding: 0 0 0 210px;
  }
  .admin-right-title-container {
    padding: 0;
    /*height: 50px!important;*/
  }
  .log-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #324157;
    color: #ffffff;
  }

  .default-scroll-bar {
    width: 100%;
    height: 100%;
  }

  .user-operation-container {
    height: 100%;
    /*background: #b3d8ff;*/
    color: #FFF;
    display: flex;
    margin-right: 1%;
    align-items: center;
    .el-dropdown-link {
      font-size: 16px;
      font-weight: 500;
    }
  }
</style>
