import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { preset } from 'vue-cli-plugin-vuetify-preset-owl/preset'

Vue.use(Vuetify)
export default new Vuetify({
  preset,
  rtl: false,
  theme: { dark: false },

})
