import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store/store';
import VueRouter from 'vue-router';
import { routes } from './routes';

import Sticky from 'vue-sticky-directive'
Vue.use(Sticky)

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
  data: {
    stickyEnabled: true,
  },
  methods: {
    onStick(data) {
      console.log(data);
    }
  },
  render: h => h(App)
});