// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import HelloWorld from '@/components/HelloWorld'
import CopName from '@/components/EnterPage'
import MainMenu from '@/components/MainMenu'
import Main from '@/components/Main'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import i18n from './i18n/i18n'
import VueAxios from 'vue-axios'
import './common/Interceptor'
// 拦截器设置
// import './common/Interceptor'
Vue.use(VueAxios, axios)
// Vue.use(myaxios)
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
// Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App, Main, MainMenu, CopName, HelloWorld },
  template: '<App/>'
})
