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
import TeacherManage from '@/components/user/TeacherManage'
import Org from '@/components/org/OrgManage'
import SubjectManage from '@/components/subject/subjectManage'
import paperManage from '@/components/paper/paperManage'
import Student from '@/components/student/student'
import exam from '@/components/student/exam'
import notes from '@/components/student/notes'
import exercise from '@/components/student/exercise'
import onExam from '@/components/student/onExam'
import wrong from '@/components/student/wrong'
import result from '@/components/student/result'
import Teacher from '@/components/teacher/teacher'
import paper from '@/components/teacher/paper'
import Class from '@/components/teacher/class'
import analyze from '@/components/teacher/analyze'
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
        requireAuth: true ,// 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requireAuth: false// 添加该字段，表示进入这个路由是需要登录的
      },
      component: Register
    },
    {
      path: '/result',
      name: 'result',
      meta: {
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: result
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
      path: '/paperManage',
      name: 'paperManage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :2
      },
      component: paperManage
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
      path:'/onExam',
      name:'onExam',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :0,
        auth:true
      },
      component:onExam
    },
    {
      path:'/student',
      name:'student',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :0,
        auth:false
      },
      component:Student,
      children: [
        {
          path:'/exam',
          name: 'exam',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :0,
            auth:true
          },
          component: exam
        },
        {
          path:'/exercise',
          name: 'exercise',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :0,
            auth:true
          },
          component: exercise
        },
        {
          path:'/wrong',
          name: 'wrong',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :0,
            auth:true
          },
          component: wrong
        },
        {
          path:'/notes',
          name: 'notes',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :0,
            auth:true
          },
          component: notes
        }
      ]
    },
    {
      path:'/teacher',
      name:'teacher',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        role :1,
        auth:false
      },
      component:Teacher,
      children:[
        {
          path:'/analyze',
          name:'analyze',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :1,
            auth:true
          },
          component:analyze,
        },
        {
          path:'/paper',
          name:'paper',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :1,
            auth:true
          },
          component:paper,
        },
        {
          path:'/class',
          name:'class',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :1,
            auth:true
          },
          component:Class,
        }

      ]
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
          path: '/teachermanage',
          name: 'teachermanage',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
          component: TeacherManage
        },
        {
          path: '/org',
          name: 'org',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
          component: Org
        },
        {
          path: '/subjectManage',
          name: 'subjectManage',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            role :2
          },
          component: SubjectManage
        }
      ]
    },
  ]
})
