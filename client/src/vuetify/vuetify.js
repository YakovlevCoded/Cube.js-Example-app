// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const opts = {
    icons: {
        iconfont: 'md',
    },
    theme: {
        themes: {
            light: {
                primary: '#6f76d9',
                secondary: '#43436B', // #FFCDD2
                accent: '#FF6492',
                background: '#F3F3FB'
            },
            dark: {
                primary: '#6f76d9',
                secondary: '#43436B', // #FFCDD2,
                accent: '#FF6492',
            }
        },
    },
}

export default new Vuetify(opts)
