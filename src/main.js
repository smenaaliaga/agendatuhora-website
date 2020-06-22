import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store/store';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.config.productionTip = false

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes
});

import Toolbar from '@/components/Toolbar'
Vue.component("toolbar", Toolbar);

import Footer from '@/components/Footer'
Vue.component("footer", Footer);

new Vue({
  vuetify,
  store,
  router,
  components: { App },
  template: '<App />',
  render: h => h(App)
}).$mount('#app')