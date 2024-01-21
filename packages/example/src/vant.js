import { createApp } from 'vue'

import "./common.css"
import Page from './views/render-vant.vue'

const app = createApp(Page)

import Vant from 'vant'
import 'vant/lib/index.css'
app.use(Vant)

app.mount('#app')
