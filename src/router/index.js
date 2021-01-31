import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
// import App from 'src/App';

// import UserTable from 'src/views/administration/userTable';
// import Admin from 'src/views/admin/admin';
// import AddUser from 'src/views/userManage/addUser/addUser';
// import DataTmp from 'src/views/admin/modules/dataTmp/dataTmp';
// import TaskList from 'src/views/admin/modules/taskList/taskList';
// import CustomContainer from 'src/views/customContainer/customContainer';
// import PartDraggable from 'src/views/partDraggable/partDraggable';
// import TenantMessage from 'src/views/tenantMessage/tenantMessage';
// import Gallery from 'src/views/gallery/gallery'
// import StudentList from 'src/views/student/studentList';
// import StudentAdd from 'src/views/student/studentAdd';

// import Article from 'src/views/article/article';

// import Login from 'src/views/login/login';

// import VideoSocket from 'src/views/VideoSocket';

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
        // component: Login
        component: resolve => require(['src/views/login/login'], resolve)
    },
    {
        path: '/manage/userTable',
        // component: UserTable
        component: resolve => require(['src/views/administration/userTable'], resolve)
    },
    {
        path: '/admin',
        name: 'Admin',
        // component: Admin,
        component: resolve => require(['src/views/admin/admin'], resolve),
        redirect:'/index',
        meta: { title: '管理系统' },
        children:[
            {
                path: '/index',
                // component: Index,
                name: 'Index',
                component: () => import('src/views/index'),
                meta: { title: '首页' }
            },
            {
                path: '/user_add',
                name: 'AddUser',
                // component: AddUser,
                component: () => import('src/views/userManage/addUser/addUser'),
                meta: { title: '添加用户' }
            },
            {
                path: '/task_list',
                name: 'TaskList',
                // component: TaskList
                component: () => import('src/views/admin/modules/taskList/taskList')
            },
            {
                path: '/data_tmp',
                name: 'DataTmp',
                // component: DataTmp
                component: () => import('src/views/admin/modules/dataTmp/dataTmp')
            },
            {
                path: '/user_list',
                name: 'UserList',
                component: resolve => require(['src/views/userManage/userList/userList'], resolve),
                meta: { title: '用户列表' }
            },
            {
                path: '/customContainer',
                name: 'CustomContainer',
                // component: CustomContainer
                component: resolve => require(['src/views/customContainer/customContainer'], resolve)
            },
            {
                path: '/partDraggable',
                name: 'PartDraggable',
                // component: PartDraggable
                component: resolve => require(['src/views/partDraggable/partDraggable'], resolve),
            },
            {
                path: '/article',
                name: 'Article',
                // component: Article
                component: resolve => require(['src/views/article/article'], resolve),
                meta: { title: '文章列表' }
            },
            {
                path: '/tenant_message',
                name: 'TenantMessage',
                // component: TenantMessage,
                component: resolve => require(['src/views/tenantMessage/tenantMessage'], resolve),
                meta: { title: '租房信息' }
            },
            {
                path: '/gallery',
                name: 'Gallery',
                // component: Gallery,
                component: resolve => require(['src/views/gallery/gallery'], resolve),
                meta: { title: '精美图库' }
            },
            {
                path: '/studentList',
                name: 'StudentList',
                // component: StudentList
                component: resolve => require(['src/views/student/studentList'], resolve)
            },
            {
                path: '/studentObjList',
                name: 'StudentObjList',
                component: resolve => require(['src/views/student/studentObjList'], resolve)
            },
            {
                path: '/studentAdd',
                name: 'StudentAdd',
                // component: StudentAdd
                component: resolve => require(['src/views/student/studentAdd'], resolve)
            },
            {
                path: '/studentGridContainer',
                name: 'StudentGridContainer',
                component: resolve => require(['src/views/student/studentGridContainer'], resolve)
            },
            {
                path: '/studentGridContainer',
                name: 'StudentGridContainer',
                component: resolve => require(['src/views/student/studentGridContainer'], resolve)
            },
            {
                path: '/tableDraggable',
                name: 'TableDraggable',
                component: resolve => require(['src/views/student/tableDraggable'], resolve)
            },
            {
                path: '/music',
                name: 'Music',
                component: resolve => require(['src/views/music/music'], resolve),
                meta: { title: '歌曲列表' }
            },
            {
                path: '/tableOperation',
                name: 'TableOperation',
                component: resolve => require(['src/views/student/tableOperation'], resolve)
            },
            {
                path: '/formOperation',
                name: 'FormOperation',
                component: resolve => require(['src/views/student/formOperation'], resolve)
            },
            {
                path: '/articleAdd',
                name: 'ArticleAdd',
                component: resolve => require(['src/views/article/articleAdd'], resolve),
                meta: { title: '创建文章' }
            }
        ]
    },
    {
        path: '/videoSocket',
        name: 'VideoSocket',
        // component: VideoSocket,
        component: resolve => require(['src/views/VideoSocket'], resolve),
    }
];

let router =  new VueRouter({
    routes,
    // mode: 'history',
    mode: 'hash',
    linkActiveClass:'mui-active'
});

export default router;
