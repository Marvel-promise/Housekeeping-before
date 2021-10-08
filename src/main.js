import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import ElementUI from 'element-ui';
import Qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
// 还有就是声明要规范   main.js中
/* import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
/* ak: 'lsaSzP34SFNx6RtfOWVSbFsIlPVa5aML'
}) */
Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.use(ElementUI,{size:'large',zIndex: 3000});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
