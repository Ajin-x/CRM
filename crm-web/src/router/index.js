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
    component:Home
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
      next('/login')
    }else{
      next()
    }
  }
})

export default router
