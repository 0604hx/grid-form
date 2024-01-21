import { createApp } from 'vue'

import "./common.css"
import Page from './views/render-element.vue'

const app = createApp(Page)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

app.mount('#app')
