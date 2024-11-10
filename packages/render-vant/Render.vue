<template>
    <div v-if="!inited" style="text-align: center;">
        <van-loading vertical>表单渲染中...</van-loading>
    </div>
    <template v-else>
        <Container :form="form" :formData="formData" :renders="renders" :lockLabelPlacement="lockLabelPlacement" />

        <van-space direction="vertical" fill style="margin: 16px;">
            <van-button v-if="form.submitText" block type="primary" native-type="submit" @click="toSubmit">{{form.submitText}}</van-button>
            <van-button v-for="btn in form.buttons" block :type="toTheme(btn.theme)" @click="onExtraBtn(btn)">{{btn.text}} </van-button>
        </van-space>
    </template>
</template>

<script setup>
    import { h, ref } from 'vue'
    import { Loading as VanLoading, Space as VanSpace, Button as VanButton } from 'vant'

    import { buildComponent, buildOptions } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    const toTheme = type=> type=='info'? 'primary':type

    let { inited, formData, toSubmit, onExtraBtn, triggerSubmit, getFormData, exec } = RenderMixin(props, emits, " Vant4")
    defineExpose({ triggerSubmit, getFormData, exec })
</script>
