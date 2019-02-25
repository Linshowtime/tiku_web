import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Register from '@/components/Register'
import KnowledgeSubject from '@/components/knowledge/knowledgeSubject'
import ProductPaper from '@/components/paper/productPaper'
import PaperEdit from '@/components/paper/paperEdit'
import paperSelect from '@/components/paper/paperSelect'
import examPaper from '@/components/paper/examPaper'
import manage from '@/components/Manage'
import KnowledgeManage from '@/components/knowledge/KnowledgeManage'
import knowledgeTreeManage from '@/components/knowledge/KnowledgeTreeManage'
import StudentManage from '@/components/user/StudentManage'
import Org from '@/components/org/OrgManage'
import Student from '@/components/student/student'
import Teacher from '@/components/teacher/teacher'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Register
    },
    {
      path: '/knowledgeSubject',
      name: 'knowledgeSubject',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component: KnowledgeSubject
    },
    {
      path:'/productPaper',
      name:'productPaper',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component:ProductPaper
    },
    {
      path:'/paperEdit',
      name:'paperEdit',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component:PaperEdit
    },
    {
      path:'/paperSelect',
      name:'paperSelect',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component:paperSelect
    },
    {
      path:'/examPaper',
      name:'examPaper',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component:examPaper
    },
    {
      path:'/student',
      name:'student',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :0
      },
      component:Student
    },
    {
      path:'/teacher',
      name:'teacher',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :1
      },
      component:Teacher
    },
    {
      path:'/manage',
      name:'manage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component:manage,
      children:[
        {
          path: '/KnowledgeManage',
          name: 'KnowledgeManage',
          component: KnowledgeManage,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
        },
        {
          path: '/knowledgeTreeManage',
          name: 'knowledgeTreeManage',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
          component: knowledgeTreeManage
        },
        {
          path: '/studentmanage',
          name: 'studentmange',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
          component: StudentManage
        },
        {
          path: '/org',
          name: 'org',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
          component: Org
        }
      ]
    },
  ]
})
