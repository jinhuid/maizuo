import Vue from 'vue'

import App from './App.vue'
// import App from '@/test/1.vue'
import router from './router'
import store from './store'

import Swiper from "swiper/bundle";
import "swiper/swiper.min.css";


Vue.prototype.$Swiper = Swiper

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


