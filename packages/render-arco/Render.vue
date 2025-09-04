<template>
    <div>
        <template v-if="!inited">
            <slot name="tip">
                <div style="text-align: center;">
                    <Spin tip="表单渲染中..."/>
                </div>
            </slot>
        </template>
        <Form v-else class="grid-render" :model="{}" :size="form.size||'medium'" :layout="form.labelPlacement=='top'?'vertical':'horizontal'">
            <Container :gridGap="gridGap" :renders="renders" :form="form" :formData="formData" />

            <Space wrap fill style="justify-content: center;">
                <Button v-if="form.submitText" :disabled="formData._disabled" size="large" type="primary" @click="toSubmit">{{form.submitText}}</Button>
                <Button v-for="btn in form.buttons" :type="btn.theme" size="large" @click="onExtraBtn(btn)">{{btn.text}} </Button>
            </Space>
        </Form>
    </div>
</template>

<script setup>
    import { ref, toRaw, unref, onMounted, nextTick, reactive, watch } from 'vue'
    import { Spin, Space, Button, Form } from '@arco-design/web-vue'

    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn, triggerSubmit, getFormData, exec } = RenderMixin(props, emits, " Arco Design")
    defineExpose({ triggerSubmit, getFormData, exec })
</script>

<style>
    .grid-render .arco-form-item {
        margin-bottom: 8px;
    }
</style>
