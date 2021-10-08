import Vue from 'vue'
import VueRouter from 'vue-router'
 import login  from "../components/user/register.vue" 
import reservation from '../components/reservation/allresvation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
	  path:'/user/login',
	  name:"userlogin",
	  component:()=>import('../components/user/login.vue')
  },{
	  path:'/user/register',
	  name:'register',
	  component:()=>import('../components/user/register.vue')
  },{
	  path:'/admin/login',
	  name:'adlogin',
	  component:()=>import('../components/admin/login.vue')
  },{
	  path:'/employee/dept',
	  name:'emDept',
	  component:()=>import('../components/employee/deptEmp.vue')
  },{
	  path:'/reservation/all',
	  name:'allRes',
	  component: reservation
  },{
	  path:'/user/message',
	  name:'message',
	  component:()=>import('../components/user/myMessage.vue')
  },{
	  path:'/reservation/new_re',
	  name:'new_re',
	  component:()=>import('../components/reservation/new_re.vue')
  },{
	  path:'/staff/add',
	  name:"addStaff",
	  component:()=>import('../components/employee/add_staff.vue')
  },{
	  path:'/res/all',
	  name:'allRes',
	  component:()=>import('../components/reservation/allresvation.vue')
  },{
	  path:'/user/log',
	  name:'log',
	  component:()=>import('../components/user/log.vue')
  },{
	  path:'/dept/dept',
	  name:'dept',
	  component:()=>import('../components/employee/dept.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
