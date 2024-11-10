<template>
    <NCard title="看看效果（Naive UI 渲染）" segmented>
        <FormRender :renders="RenderFuncs" ref="render" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />

        <NAlert title="运行结果" type="info" :show-icon="false" style="margin-top:8px;">
            {{ result.data }}
        </NAlert>

        <NCard title="试试暴露的方法" style="margin-top:20px">
            <NSpace>
                <NButton @click="triggerSubmit">外部触发Submit</NButton>
                <NButton @click="getFormData">获取表单数据</NButton>
            </NSpace>
            <div>{{ formData }}</div>
        </NCard>
    </NCard>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue'
    import { NAlert, NCard, NButton, NSpace } from 'naive-ui'

    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    import { RenderDemo } from "./render"

    let render = ref()
    let formData = ref()

    const props = defineProps({
        bean: {type:Object, default:{}}
    })

    let { form, result, onSubmit, onFailed, onInited } = RenderDemo(props.bean)
    // const { message, dialog } = createDiscreteApi(["message", "dialog"],{configProviderProps:{}})

    const triggerSubmit =()=> render.value.triggerSubmit(false)
    const getFormData = ()=> {
        let { error, data } = render.value.getFormData()
        console.debug(error, data)
        if(error){
            return console.debug(error)
        }
        formData.value = data
    }
</script>

