import { defineCustomElement } from 'vue'

import FormRender from "./Render.vue"
import OriginFormRender from './Render.ce.vue'

const RenderTree = defineCustomElement(OriginFormRender)

export { FormRender }

export function register(tagName="render-tree") {
    customElements.define(tagName, RenderTree)
}
