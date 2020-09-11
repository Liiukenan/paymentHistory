import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import MintUI from 'mint-ui'
import "./assets/css/reset.css"
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible';
import 'default-passive-events'
import base from './api/base'
import i18n from './api/lang'
import lottie from 'vue-lottie'
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.component('lottie',lottie)
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.prototype.base = base;
Vue.prototype.http = axios;
Vue.config.productionTip = false;
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");