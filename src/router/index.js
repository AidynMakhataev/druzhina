import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Users from '@/components/user/Users'
import UserDetails from '@/components/user/UserDetails'
import EditUser from '@/components/user/EditUser'
import Register from '@/components/user/Register'
import Profile from '@/components/Profile'
import Tracing from '@/components/Tracing'
import {get} from './../helpers/api'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      name: 'UserDetails',
      component: UserDetails,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/edit/:id',
      name: 'EditUser',
      component: EditUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: true }
    },
    {
      path: '/tracing',
      name: 'Tracing',
      component: Tracing,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
   if(to.meta.requiresAuth) {
     var userObj = window.localStorage.getItem('user_email')
     get('/api/user/validate')
         .then(response => {
           if(response.status === 200 && userObj) {
             next()
           }
           else {
             next({path: '/login'})
           }
         })
   } else next()
})

export default router