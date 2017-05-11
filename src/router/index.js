import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import DoTest from '@/pages/DoTest'
import Teacher from '@/pages/Teacher'
import Student from '@/pages/Student'
import MakeTest from '@/pages/MakeTest'
import Question from '@/pages/Question'
import ResolveTest from '@/pages/ResolveTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/student/:id',
      name: 'Student',
      component: Student,
      props: true
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/do-test/:student/:examId',
      name: 'DoTest',
      component: DoTest,
      props: true
    },
    {
      path: '/make-test',
      name: 'MakeTest',
      component: MakeTest
      // props: true
    },
    {
      path: '/resolve-test/:student/:examId',
      name: 'ResolveTest',
      component: ResolveTest,
      props: true
    }
  ]
})
