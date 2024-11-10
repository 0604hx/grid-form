<template>
    <div>
        <template v-if="!inited">
            <slot name="tip">
                <div style="text-align: center;">
                    <el-empty description="表单渲染中..." />
                </div>
            </slot>
        </template>
        <template v-else>
            <Container :gridGap="gridGap" :renders="renders" :form="form" :formData="formData" />

            <el-space wrap style="justify-content: center;width: 100%;">
                <el-button v-if="form.submitText" :disabled="formData._disabled" size="large" type="primary" @click="toSubmit">{{form.submitText}}</el-button>
                <el-button v-for="btn in form.buttons" :type="btn.theme" size="large" @click="onExtraBtn(btn)">{{btn.text}} </el-button>
            </el-space>
        </template>
    </div>
</template>

<script setup>
    import { ref, toRaw, unref, onMounted, nextTick, reactive, watch } from 'vue'
    import { ElEmpty, ElSpace, ElButton } from 'element-plus'

    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn, triggerSubmit, getFormData, exec } = RenderMixin(props, emits, " Element Plus")
    defineExpose({ triggerSubmit, getFormData, exec })
</script>

<style>
    .grid-render .el-form-item__content {
        line-height: 100% !important;
    }
    .grid-render .el-row .el-col {
        padding-top: 5px;
    }
</style>
