import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { auth } from './firebase'

auth.onAuthStateChanged(user => {
  if(user){
    store.dispatch('detectarUsuario', {email: user.email, uid: user.uid})
  }else{
    store.dispatch('detectarUsuario', user)
  }
});

import Sticky from 'vue-sticky-directive'
Vue.use(Sticky)

Vue.config.productionTip = true  

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
      return { x: 0, y: 0 }
  },
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/sesion',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

new Vue({
  el: "#app",
  vuetify,
  store,
  router,
  data: {
    stickyEnabled: true,
  },
  render: h => h(App)
});
