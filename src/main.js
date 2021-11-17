import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from  'vue-router'

import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import App from './components/App.vue'
import store from './store'
import Login from './components/Login.vue'

const routes = [
   {path: '/', component: Students, meta: {requiresAuth: true}},
   {path: '/student-info/:id', component: StudentInfo, props: true , meta: {requiresAuth: true}},
   {path: '/login', component: Login},
]

const router = new VueRouter({
   routes
})

router.beforeEach((to, from, next)=>{
   if(to.matched.some(record=>record.meta.requiresAuth)){
      if(store.getters.getUser === null){
         next({
            path: '/login',
            query: {redirect: to.fullPath}
         })
      } else {
         next()
      }
   } else{
      next()
   }
})
    
Vue.use(VueRouter , VueAxios, axios)

new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store
})