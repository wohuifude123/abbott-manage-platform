# ABBOTT综合管理系统

> AUTHOR: Abbott.liu

* CREATE: 2020/12/25 
* UPDATE: 2021/01/31 

## 整体技术方案范围

* 公司官方网站
* 信息管理系统
* 微信小程序

## 综合管理系统介绍

**ABBOTT综合管理系统**是解决小型公司快速搭建自己网络系统的一整套技术方案，前端主要使用`Vue`开发，后端主要使用`SpringBoot`开发。项目加入常见的企业级应用所涉及到的技术点，例如Redis等。

[更多前端资料](doc/README.md)

PS：曾经在某家996工作制小公司担任前端负责人职位，但在那里前端地位很低，必须听后端的，不听话的后果就会如那个被开除的UI。一气之下花了几个星期，连续用深夜时间开发此套后台管理系统，让那些瞧不起前端的后端人员重新了解下前端人员的技术，不知道是不是那些后端人员以前遇到的前端都很low，所以他们才会觉得前端很简单，但是我觉得，能读懂部分vue源码的人写了JAVA代码还不算太难，更何况本人几年间从未间断对JAVA代码的学习。

## 作者介绍

[刘建个人资料](http://www.xinlizhiyouni.com/myself/)

百度搜索【全栈刘建】或者【前端刘建】

## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev
  - sit
  - stage
  - prod

- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - 自适应收缩侧边栏

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
```

以前这些功能有自己的兴趣爱好，还有以前公司所涉及到技术的简单DEMO

## 项目地址

| 名称 | 地址 | 备注 |
| :---: | :---: | :---: |
| abbott-manage-platform | [代码](https://github.com/wohuifude123/abbott-manage-platform)| 前端 |
| abbott-manage-java | [代码](https://github.com/wohuifude123/abbott-manage-java)| 后端 |

## 涉及的工具与技术

### 页面设计

| 序号 | 名称 | 版本 |
| :---: | :---: | :---: |
| 1 |  Sketch | |
| 2 | PhotoShop | |
| 3 | ... | |

推荐使用Sketch，启动速度快并且能够生成前端的代码

### 前端技术栈

| 序号 | 名称 | 版本 |
| :---: | :---: | :---: |
| 1 |  Vue | |
| 2 | ElementUI | |
| 3 | axios | |
| 4 | vue-router | |
| 5 | Vuex | |
| 6 | WebSocket | |
| 7 | ... | |

### 后端技术栈

| 序号 | 名称 | 版本 |
| :---: | :---: | :---: |
| 1 | Spring Boot | |
| 2 | Spring Security | |
| 3 | MyBatis | |
| 4 | MySQL | |
| 5 | Redis | |
| 6 | WebSocket | |
| 7 | ... | |

### 操作系统

| 序号 | 名称 | 版本 |
| :---: | :---: | :---: |
| 1 | linux | |

### 数据库

| 序号 | 名称 | 版本 |
| :---: | :---: | :---: |
| 1 | MySQL | |
| 2 | Redis | |
| 3 | ... | |

### 前端服务器

| 序号 | 名称 | 版本 |
| :---: | :---: | :---: |
| 1 | Nginx | |

## 代码规范

>Code Standard

前端代码规范需要根据当前公司的规模和项目开发节奏而定，一些大型公司的代码规范和ESLint只适合参考，实际用处不大。

以下是曾经当前端组长时指定的一些基础的规范，虽不多，但是却实用。

* [前端基本规范](doc/front_end/README.md)
* [VUE规范](doc/front_end/VUE.md)

## 搭建指令
>Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:port
npm run dev

# build for production with minification
npm run build
```

## 启动地址
>Network Address

``` bash
http://0.0.0.0:6600
```

## 目录结构
>Directory Structure

```
├── build                                         // 项目构建(webpack)相关代码
│   ├── build.js                                  // 生产环境构建代码
│   ├── check-version.js                          // 检查node、npm等一些所依赖工具的版本是否适用
│   ├── logo.png              
│   ├── utils.js                                  // 构建工具相关
│   ├── vue-loader.conf.js                        // 用来解决各种样式文件
│   ├── webpack.base.conf.js                      // webpack基础配置
│   ├── webpack.dev.conf.js                       // webpack开发环境配置
│   ├── webpack.prod.conf.js                      // webpack生产环境配置
├── dist                                          // build 生成的生产环境下的项目
├── config                                        // 项目开发环境配置
│   ├── dev.env.js                                // 开发环境变量
│   ├── index.js                                  // 项目一些配置变量
│   ├── prod.env.js                               // 生产环境变量
│   ├── test.env.js                               // 测试环境变量
├── node_modules                                  // 依赖包，通常执行npm i会生成
├── src                                           // 源码目录
│   ├── api                                       // 服务（统一管理 XHR 请求）
│   ├── assets                                    // 放置需要经由 Webpack 处理的静态文件，通常为样式类文件
│   │   ├── images                                // 公共图片文件
│   │   ├── scripts                               // 公共javascript文件
│   │   ├── styles                                // 公共样式文件
│   │   │    ├── base.css                         // 基础文件样式
│   ├── components                                // vue公共组件
│   ├── router                                    // 项目路由管理
│   │   ├── index.js                              // 路由文件
│   ├── store                                     // vuex的状态管理
│   │   ├── modules                               // vuex store模块管理
│   │   │   ├──form.js   
│   │   │   ├──user.js   
│   │   ├── actions.js                            // 存放mutations属性
│   │   ├── getters.js                            // 存放actions属性  
│   │   ├── index.js                              // 存放getters属性
│   │   ├── mutations.js                          // 存放mutations属性
│   │   ├── mutations-type.js                     // 存放mutaions方法常量的文件，按需要可加入
│   ├── utils                                     // 工具类
│   │   ├── libs                                  // 第三方插件
│   ├── views                                     // 路由页面组件
│   │   ├──admin                                  // 管理模块
│   │   │   ├── admin.vue                         // 管理页面
│   │   ├──login                                  // 登录模块
│   │   ├──third                                  // 生成器模块
│   │   │   ├──element-form
│   │   │   │  ├──view
│   │   │   │  │  ├──components                   // 表单编辑器新增组件
│   │   │   │  │  │  ├──LayoutCustomForm          // 表单块
│   │   │   │  │  │  ├──LayoutDiv                 // div块布局组件
│   │   │   │  │  │  ├──LayoutGrid                // 栅格布局组件
│   │   │   │  │  │  ├──LayoutTabs                // tabs切换页布局组件
│   │   │   │  │  │  ├──TreeMenu                  // 目录树
│   │   │   │  │  │  ├──widgetMixin.js            // 布局组件公共方法抽离出的文件
│   │   │   │  ├──Container.vue                   // 生成器主页
│   │   │   │  ├──WidgetConfig.vue                // 生成器右侧操作
│   │   ├── student                               // 功能测试目录
│   │   ├── resume                                // 作者个人介绍
│   ├── App.vue                                   // 页面入口文件
│   ├── main.js                                   // 程序入口文件，加载各种公共组件
├── static                                        // 静态文件，比如一些图片，json数据等
├── .babelrc                                      // ES6语法编译配置
├── .editorconfig                                 // 定义代码格式
├── .gitignore                                    // git上传需要忽略的文件格式
├── README.md                                     // 项目说明
├── favicon.ico 
├── index.html                                    // 入口页面
├── package.json                                  // 项目基本信息
├── package-lock.json                             // 记录当前状态下实际安装的各个npm package的具体来源和版本号
├── .eslintignore                                 // 忽略哪些文件的语法检查
├── .eslintrc.js                                  // 语法检查规则配置
├── .gitignore                                    // git上传需要忽略的文件格式
├── .postcssrc.js                                 // postcss 配置文件
```

## Technology

**normalize.css**

Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.

**Vue.Draggable**

Vue component (Vue.js 2.0) or directive (Vue.js 1.0) allowing drag-and-drop and synchronization with view model array.

Based on and offering all features of Sortable.js

## Notes

### 请求API方法

/src/api 文件夹

```
import ApiInstance from '@/utils/api.instance'

export const getEntityList = data => {
  return ApiInstance.request({
    // baseURL: 'http://123.56.242.13:1314', // 此行可以不加，加上就会覆盖原本baseURL
    url: '/sysTableController/getEntityList',
    method: 'post',
    data: data
  })
}
```

使用的文件中

```
import {getEntityList} from '@/api/form/form'

mounted () {
  const _this = this
  let paramsList = {
    "notIncludeList":[],
    "pageNo": 1,
    "pageSize": 10,
    "searchContent":"",
     "description":""
  }
  getEntityList(paramsList).then(res=>{
    console.log(res)
  },err=>{
  console.log(err)
  })
}
```

## Others

[其他相关资料](doc/README.md)

