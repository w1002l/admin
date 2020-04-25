import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import userList from '../components/users/userList.vue'
import sheBei from '../components/shebei/sheBei.vue'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/userlist',
          name: '用户列表',
          component: userList
        },
        {
          path: '/shebei',
          name: '设备列表',
          component: sheBei
        }
      ]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
