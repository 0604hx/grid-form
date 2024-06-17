import { defineCustomElement } from 'vue'

import WebComponentWrapper from "./Render.vue"
import OriginFormRender from './Render.ce.vue'

const RenderTree = defineCustomElement(OriginFormRender)

// 分别导出元素
export { WebComponentWrapper as FormRender}

export function register(tagName="render-tree") {
    customElements.define(tagName, RenderTree)
}
