<template>
    <div v-if="!inited" style="text-align: center;">
        <var-loading />
    </div>
    <template v-else>
        <Container style="padding-top: 10px;" :form="form" :formData="formData" :renders="renders" :lockLabelPlacement="lockLabelPlacement" />

        <var-space direction="column" style="margin-top: 12px;">
            <var-button v-if="form.submitText" block type="primary" native-type="submit" @click="toSubmit">{{form.submitText}}</var-button>
            <var-button v-for="btn in form.buttons" block :type="toTheme(btn.theme)" @click="onExtraBtn(btn)">{{btn.text}} </var-button>
        </var-space>
    </template>
</template>

<script setup>
    import { h, ref } from 'vue'
    import { Loading as VarLoading, Space as VarSpace, Button as VarButton } from '@varlet/ui'

    import { buildComponent, buildOptions } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " VARLET")

    const toTheme = type=> type=='info'? 'primary':type
</script>
