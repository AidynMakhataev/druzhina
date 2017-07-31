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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/user/:id',
      name: 'UserDetails',
      component: UserDetails
    },
    {
      path: '/user/edit/:id',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/tracing',
      name: 'Tracing',
      component: Tracing
    }
  ]
})
