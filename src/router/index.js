import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import App from 'src/App';
import UserTable from 'src/views/administration/userTable';
import Admin from 'src/views/admin/admin';
import AddUser from 'src/views/userManage/addUser/addUser';
import DataTmp from 'src/views/admin/modules/dataTmp/dataTmp';
import TaskList from 'src/views/admin/modules/taskList/taskList';
import CustomContainer from 'src/views/customContainer/customContainer';
import UserList from 'src/views/userManage/userList/userList';
import PartDraggable from 'src/views/partDraggable/partDraggable';
import Article from 'src/views/article/article';

import Index from 'src/views/index';
import Login from 'src/views/login/login';

import VideoSocket from 'src/views/VideoSocket';

/**
 * 要告诉 vue 使用的 vueRouter
 * 书写规范：路由中的name都要大写，path都要小写
 */
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/manage/userTable',
        component: UserTable
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        redirect:'/index',
        children:[
            {
                path: '/index',
                component: Index
            },
            {
                path: '/user_add',
                name: 'AddUser',
                component: AddUser,
            },
            {
                path: '/task_list',
                name: 'TaskList',
                component: TaskList
            },
            {
                path: '/data_tmp',
                name: 'DataTmp',
                component: DataTmp
            },
            {
                path: '/user_list',
                name: 'UserList',
                component: UserList
            },
            {
                path: '/customContainer',
                name: 'CustomContainer',
                component: CustomContainer
            },
            {
                path: '/partDraggable',
                name: 'PartDraggable',
                component: PartDraggable
            },
            {
                path: '/article',
                name: 'Article',
                component: Article
            }
        ]
    },
    {
        path: '/videoSocket',
        name: 'VideoSocket',
        component: VideoSocket,
    }
];

let router =  new VueRouter({
    routes,
    // mode: 'history',
    mode: 'hash',
    linkActiveClass:'mui-active'
});

export default router;
