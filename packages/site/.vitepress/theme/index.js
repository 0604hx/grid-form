import DefaultTheme from 'vitepress/theme'
import './custom.css'

import NaiveWrapper from "../../components/common/naive.vue"

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }){
        // app.use(naive)
        app.component('NaiveWrapper', NaiveWrapper)
    }
}
