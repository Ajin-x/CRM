import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/cssreset.css'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入axios挂载全局
import axios from 'axios';
Vue.prototype.$axios = axios;
//默认配置
// axios.defaults.baseURL = 'http://localhost:8888'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
