import Vue from "vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLazyLoad from "vue-lazyload";
import VueCookie from "vue-cookie";

import store from "./store/index";
import App from "./App.vue";

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;
axios.interceptors.response.use(
    function(response) {
        let res = response.data;
        let path = location.hash;
        if (res.status == 0) {
            return res.data;
        } else if (res.status == 10) {
            if (path != "#/index") {
                window.location.href = "/#/login";
            }
            return Promise.reject();
        } else {
            return Promise.reject(res);
        }
    },
    (error) => {
        let res = error.response;
        if (res.data.status == 500) {
            return Promise.reject();
        }
    }
);

Vue.use(VueAxios, axios); //将axios挂载到vue实例上，这样就可以直接使用this.axios
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
    loading: "/imgs/loading-svg/loading-bars.svg",
});

Vue.config.productionTip = false; //生产环境下不给任何错误提示

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
