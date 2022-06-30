import App from './App'
// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';

import commonConfig from '@/common/common.config.js'

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 使用 uView UI
	app.use(uView).use(commonConfig).use(httpInterceptor);
  return {
    app
  }
}
// #endif