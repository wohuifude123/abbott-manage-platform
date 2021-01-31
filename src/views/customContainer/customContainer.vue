<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <!-- 左侧 -->
        <el-aside width="250px">
          <div class="components-list">
            <!-- 左侧 - 基础字段 -->
            <div class="widget-cate">基础字段</div>
            <draggable
                    tag="ul"
                    :list="basicComponents"
                    v-bind="{group: {name: 'people', pull: 'clone',put: false}, sort: false, ghostClass: 'ghost'}"
                    @end="handleMoveEnd"
                    @start="handleMoveStart"
                    :move="handleMove">
              <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- 左侧 - 高级字段 -->
            <div class="widget-cate">高级字段</div>
            <draggable tag="ul"
                       :list="advanceComponents"
                       v-bind="{group: {name: 'people', pull: 'clone', put: false}, sort: false, ghostClass: 'ghost'}"
                       @end="handleMoveEnd"
                       @start="handleMoveStart"
                       :move="handleMove">
              <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
            <!-- 左侧 - 布局字段 -->
            <div class="widget-cate">布局字段</div>
            <draggable tag="ul"
                       :list="layoutComponents"
                       v-bind="{group: {name: 'people', pull: 'clone', put:false}, sort: false, ghostClass: 'ghost'}"
                       @end="handleMoveEnd"
                       @start="handleMoveStart"
                       :move="handleMove">
              <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </a>
              </li>
            </draggable>
          </div>
        </el-aside>
        <!-- 中间内容 -->
        <el-container>
          <el-main :class="{'widget-empty': widgetForm.list.length === 0}">
            <widget-form
                    v-if="!resetJson" ref="widgetForm"
                    :data="widgetForm"
                    :select.sync="widgetFormSelect"
                    :advanceComponents="advanceComponents"
                    :basicComponents="basicComponents"
            >
            </widget-form>
          </el-main>
        </el-container>
        <!-- 右侧属性选择 -->
        <el-aside class="widget-config-container">
          <el-container>
            <el-header class='widget-config-header' height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <!--<widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :widgetForm="widgetForm" :isKeyUniqueComputed="isKeyUniqueComputed" @handerKeyUniqueComputed="handerKeyUniqueComputed"></widget-config>-->
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>
        </el-aside>

      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import Draggable from 'vuedraggable'
import { basicComponents, advanceComponents, layoutComponents } from './assets/scripts/iconConfig.js'
import CustomForm from './components/CustomForm'
import WidgetConfig from './components/WidgetConfig'
import FormConfig from './components/FormConfig'
import WidgetForm from './components/WidgetForm'
import Axios from 'axios';
export default {
  name: "CustomContainer",
  components: {
    Draggable,
    CustomForm,
    WidgetForm,
    WidgetConfig,
    FormConfig
  },
  data () {
    return {
      list: [
        [1,2,3,4,5],
        [10,20,30,40,50],
      ],
      test: '',
      widgetFormSelect: { // select属性
        'name': 'abc'
      },
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
      dragOptions:{
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style'
      },
      basicComponents, // 左侧基础字段
      advanceComponents, // 左侧高级字段
      layoutComponents, // 左侧布局字段
      resetJson: false,
      isKeyUniqueComputed: true,
      configTab: 'widget',
      activeNames:1,
    }
  },
  mounted () {
    let _this = this
    // console.log('list 1 == ', _this.list[1]);
    // let url='/test/home/other';
    // let data = {
    //   "code": "abc",
    //   "id": "123322"
    // }
    let url = 'http://123.56.242.13:1314/sysTableController/getEntityList'
    let data = {
      "notIncludeList":[],
      "pageNo":1,
      "pageSize":10,
      "searchContent":"",
      "description":""
    }
    Axios.post(`${url}`, data)
        .then(function (response) {
          console.log(response);
          if (response.data.code === "200") {
            console.log(response.data.data.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd () {

    },
    handleMoveStart () {
      console.log('handleMoveStart == ')
    },
    handleMove () {

    },
    operate () {
      let _this = this
      console.log('操作')
      _this.widgetForm.list = [ Math.ceil(Math.random()*10), Math.ceil(Math.random()*10), 3, 4, 5 ]
      // console.log(_this.widgetForm)
    },
    handerKeyUniqueComputed (isKeyUniqueComputed) {
      this.isKeyUniqueComputed = isKeyUniqueComputed
    }
  }
}
</script>

<style lang="scss" scoped>
  .widget-empty {

  }

  .preview-modal-title {
    height: 40px;
    line-height: 40px;
    /*background-color: #409EFF;*/
    text-align-last: left;
    color: #fff;
    padding-left: 10px;
  }

  .btn-create-tree-container {
    height: 36px;
  }

  .btn-create-tree {
    line-height: 28px;
    /*background: #00b4aa;*/
    font-size: 14px;
    color: #606266;
  }

  .widget-config-header {
    /*background: #e6a23c;*/
    display: flex;
  }
</style>
