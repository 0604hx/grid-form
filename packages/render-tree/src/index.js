import { defineCustomElement } from 'vue'
import Render from './Render.vue'

const RenderTree = defineCustomElement(Render)

// 分别导出元素
export { RenderTree }

export function register(tagName="render-tree") {
    customElements.define(tagName, RenderTree)
}
