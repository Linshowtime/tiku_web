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
import User from '@/components/user/User'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/knowledgeSubject',
      name: 'knowledgeSubject',
      component: KnowledgeSubject
    },
    {
      path:'/productPaper',
      name:'productPaper',
      component:ProductPaper
    },
    {
      path:'/paperEdit',
      name:'paperEdit',
      component:PaperEdit
    },
    {
      path:'/paperSelect',
      name:'paperSelect',
      component:paperSelect
    },
    {
      path:'/examPaper',
      name:'examPaper',
      component:examPaper
    },
    {
      path:'/manage',
      name:'manage',
      component:manage,
      children:[
        {
          path: '/KnowledgeManage',
          name: 'KnowledgeManage',
          component: KnowledgeManage
        },
        {
          path: '/knowledgeTreeManage',
          name: 'knowledgeTreeManage',
          component: knowledgeTreeManage
        },
        {
          path: '/user',
          name: 'user',
          component: User
        }
      ]
    },
  ]
})
