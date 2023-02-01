<template>
    <div>
        <template v-if="!inited">
            <slot name="tip">
                <div class="text-center">
                    <n-spin><template #description>表单渲染中...</template></n-spin>
                </div>
            </slot>
        </template>
        <n-form v-else :size="form.size||'medium'" :label-width="form.labelWidth" :label-placement="form.labelPlacement" :label-align="form.labelAlign" :show-label="form.labelShow">
            <n-message-provider>
                <n-grid :x-gap="gridGap" :y-gap="gridGap" :cols="form.grid" :style="{width: form.width, margin:'0px auto' }">
                    <n-form-item-gi v-for="(item, index) in form.items" :key="index" :span="item._col" :show-feedback="false" :label="item._text" :show-label="item._text!=undefined">
                        <component v-model:value="formData[item._uuid]" :is="buildComponent(item, renders[item._widget], false)" />
                    </n-form-item-gi>
                </n-grid>
                <div class="text-center mt-4">
                    <n-space justify="center">
                        <n-button v-if="form.submitText" :disabled="formData._disabled" size="large" type="primary" @click="toSubmit">{{form.submitText}}</n-button>
                        <n-button v-for="btn in form.buttons" :type="btn.theme" size="large" @click="onExtraBtn(btn)">{{btn.text}} </n-button>
                    </n-space>
                </div>
            </n-message-provider>
        </n-form>
    </div>
</template>

<script setup>
    import { ref, toRaw, unref, onMounted, nextTick, reactive, watch } from 'vue'

    import { buildComponent } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " NaiveUI")
</script>
