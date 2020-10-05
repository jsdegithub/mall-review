import Vue from "vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLazyLoad from "vue-lazyload";

import App from "./App.vue";

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;
axios.interceptors.response.use((response) => {
    let res = response.data;
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {
        window.location.href = "/#/login";
    } else {
        alert(res.msg);
    }
});

Vue.use(VueAxios, axios); //将axios挂载到vue实例上，这样就可以直接使用this.axios
Vue.use(VueLazyLoad, {
    loading: "/imgs/loading-svg/loading-bars.svg",
});

Vue.config.productionTip = false; //生产环境下不给任何错误提示

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
