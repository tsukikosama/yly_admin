//导入vuerouter
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({ 
    scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    if (savePosition) {
        return savePosition;
    } else {
        var top;
        if (window.innerWidth >= 700) {
             top = 676
        } else {
             top = 267
        }
        return {
            x: 0,
            y: top
        }
    }
},
  
    // 配置路由规则
    routes: [
        {
            path : '/',
            name:'登录页面',
            component:()=>import('../components/Login.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/home',
            name : '主页',
            component:()=>import('../page/home.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 1
            }
        },
        {
            path : '/item',
            name : '娱乐项目',
            component:()=>import('../page/item.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 2
              }
        },
        {
            path : '/news',
            name : '新闻管理',
            component:()=>import('../page/news.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 3
              }
        },
        {
            path : '/shop',
            name : '商店管理',
            component:()=>import('../page/shop.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 4
              }
        },
        {
            path : '/order',
            name : '订单管理',
            component:()=>import('../page/order.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 5
              }
        },
        {
            path : '/review',
            name : '评论管理',
            component:()=>import('../page/review.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 6
              }
        },
        {
            path : '/service',
            name : '在线回复',
            component:()=>import('../page/service.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 7
              }
        },
        {
            path : '/user',
            name : '用户管理',
            component:()=>import('../page/user.vue'),
            meta: {
                requireAuth: true,
                breadNumber: 9
              }
        }
        
    ]
    
    
})
