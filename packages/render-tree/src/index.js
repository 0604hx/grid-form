import { defineCustomElement } from 'vue'

import WebComponentWrapper from "./Render.vue"
import FormRender from './Render.ce.vue'

const RenderTree = defineCustomElement(FormRender)

// 分别导出元素
export { FormRender, WebComponentWrapper }

export function register(tagName="render-tree") {
    customElements.define(tagName, RenderTree)
}
