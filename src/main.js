import Vue from "vue";
import App from "./App.vue";
import SvgIcon from "@/components/svg-icon.vue";

Vue.config.productionTip = false;
Vue.component("SvgIcon", SvgIcon);

new Vue({
  render: h => h(App)
}).$mount("#app");
