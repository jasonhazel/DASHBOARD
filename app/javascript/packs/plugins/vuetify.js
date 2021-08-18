import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    dark: true,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: colors.deepPurple.lighten4,
        secondary: '#eeeeee',
        background: '#FFFFFF',
        accent: colors.deepPurple.lighten2
      },
      dark: {
        primary: colors.deepPurple,
        secondary: '#111111',
        background: '#000000',
        accent: colors.deepPurple.lighten1
      }
    }
  }
}

export default new Vuetify(opts)