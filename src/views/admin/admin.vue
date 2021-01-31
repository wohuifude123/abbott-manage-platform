<template>
  <el-container style="height: 100%">
    <!--<el-aside width="200px" style="background: #324157">-->
    <admin-menu
            :isCollapse="isCollapse"
            @addTopTag="addTopTag"
    ></admin-menu>
    <el-main
            class="admin-right-main-container"
            :class="{'admin-right-collapse': isCollapse, 'admin-right-spread': !isCollapse}">
      <el-header class="admin-right-title-container">
        <div class='admin-right-navigation' style="width:100%;overflow: hidden; height: 100%">
          <div class="admin-radio-group">
            <el-radio-group
                    size="small"
                    v-model="isCollapse"
            >
              <el-radio-button :label="false" >展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
          </div>
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
      <el-main class="main-content-container">
        <!--<el-breadcrumb separator="/" class='breadcrumb-container'>-->
        <!--<el-breadcrumb-item-->
        <!--v-for="(item,index) in breadList"-->
        <!--:key="index"-->
        <!--:to="{ path: item.path }"-->
        <!--&gt;{{item.meta.title}}</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <div class='admin-tabs-container'>
          <el-tabs
                  v-model="pageTabCurrent"
                  type="card" closable
                  @tab-click='changeTab'
                  @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item) in pageList"
                    :key="item.name"
                    :name="item.name"
                    style="height: 30px"
            >
            <span slot="label">
              <span>{{item.label}}</span>
              <span class="refresh">
                <i style="font-size:15px;" @click="refreshModule" class="el-icon-refresh" ></i>
              </span>
            </span>
            </el-tab-pane>
          </el-tabs>
        </div>
        <keep-alive :exclude="exclude">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-main>
  </el-container>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import AdminMenu from './modules/adminMenu/adminMenu'

export default {
  data() {
    return {
      searchCriteria: '',
      breadcrumbItems: ['导航一'],
      isCollapse: false,
      usernameDefault: 'abbott.liu',
      breadList: [],
      pageTabCurrent:'',
      pageList: [
        // {
        //   name: "王子1",
        //   label: "导航1"
        // },
        // {
        //   name: "王子2",
        //   label: "导航2"
        // }
      ],
      exclude: null,
      condition: true
    }
  },
  components: {
    AdminMenu
  },
  watch: {
    user: val => {
      console.log('watch user val ======= ', val);
    },
    isCollapse: val => {
      console.log('isCollapse == ', val)
    },
    // 面包屑
    // $route() {
    //   console.log("$route")
    //   this.getBreadcrumb();
    // }
    $route: {
      handler (to, form=null) {
        //当路由改变时，检测该路由是否已经在打开的页面之中，如果不在，就添加进去
        this.pageTabCurrent = to.path;
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('user', {
      state: state => state
    })
  },
  mounted () {
    const _this = this
    // console.log('admin state == ', _this.state)
    // window.addEventListener('scroll', _this.handleScroll)
    // console.log('username == ', JSON.stringify(_this.state.userInfo))
    if(_this.state.userInfo.hasOwnProperty('username')) {
      _this.usernameDefault = _this.state.userInfo.username
    } else {
      // console.log('username == 无')
    }

    // _this.getBreadcrumb();
    _this.addTopTag()
  },
  methods: {
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
    },
    isHome(route) {
      console.log('isHome route == ', route)
      return route.name === "Admin";
    },
    getBreadcrumb () {
      let matched = this.$route.matched;
      console.log('matched == ', matched)
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/admin", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    },
    addTopTag () {
      const _this = this
      let matched = _this.$route.matched
      console.log('改变头部标签 changeTopTag matched == ', matched)
      let arrPage = _this.pageList.map((item, index)=>{
        return item.name
      });
      // console.log('arrPage == ', arrPage)
      if(arrPage.indexOf(matched[1].path) === -1) {
        let tagObj = {
          name: matched[1].path,
          label: matched[1].meta.title
        }
        _this.pageList.push(tagObj)
      }
    },
    removeTab (targetName) {
      let tabs = this.pageList;
      let activeName = this.pageTabCurrent;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      };
      this.pageTabCurrent = activeName;
      this.pageList = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({path:activeName})
    },
    changeTab (tab, event){
      const _this = this
      _this.$router.push({
        path: tab.name
      })
    },
    refreshModule () {
      // this.exclude = this.$refs.view.$options.name;
      // this.condition = !this.condition
      // this.$nextTick(_ => {
      //   this.exclude = null
      //   this.condition = !this.condition
      // })
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
    background: #f0f2f5;
  }
  .admin-right-collapse {
    padding: 0 0 0 60px;
  }

  .admin-right-spread {
    padding: 0 0 0 210px;
  }

  .admin-right-title-container {
    padding: 0;
    /*height: 50px!important;*/
  }

  .admin-radio-group {
    float:left;
    /*padding-top:10px;*/
    color:white;
    /*margin-left:1%;*/
    /*background: #F56C6C;*/
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 20px;
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

  .main-content-container {
    /*background: fuchsia;*/
    /*height: 100%*/
    background: #f0f2f5;
    padding: 0;
  }

  .breadcrumb-container {
    height: 30px;
    box-sizing: border-box;
    padding-left: 20px;
    background: rgb(240, 242, 245);
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ACACAC;
  }

  .admin-tabs-container {
    height: 40px;

  }
  .el-tabs__nav-wrap {
    background: #D9E0E9;
  }

  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 15px;
    font-weight: 500;
    color: #000;
    position: relative;
    border-right: 1px solid #ffffff;
  }

  .el-tabs--card>.el-tabs__header {
    border-bottom: 1px solid #E4E7ED;
    background-color: #ffffff; //修改背景色
    margin: 0;
  }
</style>
