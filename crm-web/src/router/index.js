import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //重定向
    redirect:'/login',
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path:'/home',
    name:'Home',
    redirect:'/welcome',
    component:Home,
    children:[
      {
        path:'/user',
        name:'User',
        component: () => import(/* webpackChunkName: "user" */ '../components/user/user.vue')
      },
      {
        path:'/welcome',
        name:'welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../components/welcome.vue')
      },
      {
        path:'/customer',
        name:'Customer',
        component: () => import(/* webpackChunkName: "customer" */ '../components/customer/customer.vue')
      },
      {
        path:'/lossCustomer',
        name:'lossCustomer',
        component: () => import(/* webpackChunkName: "losscustomer" */ '../components/customer/lossCustomer.vue')
      },
      {
        path:'/delCustomer',
        name:'delCustomer',
        component: () => import(/* webpackChunkName: "delCustomer" */ '../components/customer/delCustomer.vue')
      },
      {
        path:'/customerData',
        name:'customerData',
        component: () => import(/* webpackChunkName: "customerData" */ '../components/chartData/customerData.vue')
      },
      {
        path:'/customerData2',
        name:'customerData2',
        component: () => import(/* webpackChunkName: "customerData" */ '../components/chartData/customerData2.vue')
      },
    ]
  }

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//全局守卫 验证是否登陆

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
  }else{
    const token = window.localStorage.getItem('token');
    if(!token){
      //这儿还拿不到$router
      window.alert('请先登录！')
      next('/login')
    }else{
      next()
    }
  }
})

export default router
