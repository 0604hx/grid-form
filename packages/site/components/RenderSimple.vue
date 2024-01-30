<template>
    <NCard title="看看效果（Naive UI 渲染）" segmented>
        <FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />

        <NAlert title="运行结果" type="info" :show-icon="false" style="margin-top:8px;">
            {{ result.data }}
        </NAlert>
    </NCard>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue'
    import { createDiscreteApi, NAlert, NCard } from 'naive-ui'

    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    import { RenderDemo } from "./render"

    const props = defineProps({
        bean: {type:Object, default:{}}
    })

    let { form, result, onSubmit, onFailed, onInited } = RenderDemo(props.bean)
    // const { message, dialog } = createDiscreteApi(["message", "dialog"],{configProviderProps:{}})
</script>

