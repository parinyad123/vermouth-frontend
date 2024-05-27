import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import "@mdi/font/css/materialdesignicons.css";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi",
      },
});
