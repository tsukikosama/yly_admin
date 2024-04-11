import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入路由规则
import router  from './router/index';
import request from './utils/request';
import VueRouter from 'vue-router';
import store from './vuex/index.js'
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.request = request;


 new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

/**
 * 把对象中的值清空为''
 * @param {} obj 
 * @returns 
 */
 Vue.prototype.clearValue = function(obj){
  // console.log(obj)
  
  for(let key of Object.keys(obj)){       
    console.log(key)           
    obj[key] = '';
    
}
  return obj;
}