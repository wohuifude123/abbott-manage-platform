/**
 * 作者：Abbott.liu
 * 时间：2019年5月
 * 功能：网站登陆页面
 */

//main.js是 入口js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App';
import VueRouter from 'vue-router';
import router from './router/index';
import store from './store';
import ASSISTANT from 'public-assistant';
import axios from 'axios';  //导入axios
import Echarts from 'echarts';
import VCharts from 'v-charts'
import BaiduMap from 'vue-baidu-map'
import VueSocketIO from 'vue-socket.io'
import './assets/icons' // icon

// global css
import './assets/styles/index.scss'
import './assets/styles/element-variables.scss'
import ObjectHelper from '@/utils/helper-platform'

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios

Vue.use(VueRouter);//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(ASSISTANT)
Vue.use(ElementUI)
Vue.use(Echarts)
Vue.use(VCharts)

Vue.prototype.$Echarts = Echarts;
Vue.prototype.$ObjectHelper = ObjectHelper;

import 'normalize.css/normalize.css'
import '@/assets/styles/icons/iconfont.css'
import '@/assets/icons'

Vue.use(BaiduMap, {
    ak: '4fp5IZ0GdAkuVRaoiGkjPkTlMlNizRnZ'
});
//
// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://localhost:48330'
//     vuex: {       
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     }
// }))

//组件



//定义路由

//创建 router 实例，然后传 routes 配置

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // console.log('to == ', to)
    next();
})

// 以下代码解决路由地址重复的报错问题（一劳永逸）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
    el: '#app',    //这里绑定的是index.html中的id为app的div元素
    router,
    store,
    render: h => h(App)
});

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });
