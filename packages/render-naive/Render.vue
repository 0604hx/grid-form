<template>
    <div>
        <template v-if="!inited">
            <slot name="tip">
                <div style="text-align: center;">
                    <NSpin><template #description>表单渲染中...</template></NSpin>
                </div>
            </slot>
        </template>
        <NForm v-else :size="form.size||'medium'" :label-width="form.labelWidth" :show-label="form.labelShow">
            <NMessageProvider>
                <Container :gridGap="gridGap" :renders="renders" :form="form" :formData="formData" />

                <NSpace justify="center" style="margin-top: 12px;">
                    <NButton v-if="form.submitText" :disabled="formData._disabled" size="large" type="primary" @click="toSubmit">{{form.submitText}}</NButton>
                    <NButton v-for="btn in form.buttons" :type="btn.theme" size="large" @click="onExtraBtn(btn)">{{btn.text}} </NButton>
                </NSpace>
            </NMessageProvider>
        </NForm>
    </div>
</template>

<script setup>
    import { ref, toRaw, unref, onMounted, nextTick, reactive, watch } from 'vue'
    import { NSpin, NForm,NMessageProvider, NButton, NSpace } from 'naive-ui'

    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " NaiveUI")
</script>
