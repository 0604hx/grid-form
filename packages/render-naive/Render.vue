<template>
    <div>
        <template v-if="!inited">
            <slot name="tip">
                <div style="text-align: center;">
                    <n-spin><template #description>表单渲染中...</template></n-spin>
                </div>
            </slot>
        </template>
        <n-form v-else :size="form.size||'medium'" :label-width="form.labelWidth" :show-label="form.labelShow">
            <n-message-provider>
                <Container :gridGap="gridGap" :renders="renders" :form="form" :formData="formData" :labelPlacement="form.labelPlacement" :labelAlign="form.labelAlign"/>

                <n-space justify="center" style="margin-top: 12px;">
                    <n-button v-if="form.submitText" :disabled="formData._disabled" size="large" type="primary" @click="toSubmit">{{form.submitText}}</n-button>
                    <n-button v-for="btn in form.buttons" :type="btn.theme" size="large" @click="onExtraBtn(btn)">{{btn.text}} </n-button>
                </n-space>
            </n-message-provider>
        </n-form>
    </div>
</template>

<script setup>
    import { ref, toRaw, unref, onMounted, nextTick, reactive, watch } from 'vue'

    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " NaiveUI")
</script>
