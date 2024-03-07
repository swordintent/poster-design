/*
 * @Author: ShawnPhang
 * @Date: 2022-03-03 14:13:16
 * @Description:
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-06-29 15:11:46
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import 'normalize.css/normalize.css'
import '@/assets/styles/index.less'
import elementConfig from './utils/widgets/elementConfig'

const app = createApp(App)

elementConfig.components.forEach((component) => {
  app.component(component.name, component)
})

elementConfig.plugins.forEach((plugin: any) => {
  app.use(plugin)
})

// main.js 或你的入口文件
app.directive('check-login', {
  mounted(el, binding, vnode) {
    const originalClickHandler = binding.value; // 获取原始点击处理函数

    el.addEventListener('click', async () => {
      const store = vnode.dirs[0].instance.$store; // 获取store
      if (store.getters.online) {
        originalClickHandler(); // 如果用户已登录，执行原始点击逻辑
      } else {
        store.dispatch('toggleLoginDialog', true); // 否则，弹出登录框
      }
    });
  }
});


app
  .use(store)
  .use(router)
  .use(utils)
  .mount('#app')
