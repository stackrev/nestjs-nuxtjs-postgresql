import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Moment from 'vue-jalali-moment'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
Vue.use(Moment)

// Translation provided by Vuetify (javascript)
import fa from 'vuetify/es5/locale/fa'

export default new Vuetify({
  lang: {
    locales: { fa },
    current: 'fa'
  }
})
