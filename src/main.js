import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store/store';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.config.productionTip = false

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: "#app",
  vuetify,
  store,
  router,
  render: h => h(App)
});