<template>
    <n-split direction="horizontal" style="height: 100vh" :max="0.75" :min="0.25">
        <template #1>
            <div style="height: 100%;overflow: auto;">
                <div class="p10">
                    <n-card title="表单渲染示例（Naive UI）" :segmented="{content: true}" size="small">
                        <FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
                    </n-card>

                    <n-divider title-placement="center">表单反馈输出</n-divider>
                    <div v-if="result.title">
                        <n-tag :type="result.type">{{result.title}}</n-tag>
                        {{result.data}}
                    </div>
                </div>
            </div>
        </template>
        <template #2>
            <div class="p10">
                <n-card title="表单源代码（从可视化编辑器中导出）" size="small">
                    <template #header-extra>
                        <n-button type="primary" @click="refresh">重绘表单</n-button>
                    </template>
                    <n-input type="textarea" style="height: calc(100vh - 95px);" v-model:value="code" size="small" />
                </n-card>
            </div>
        </template>
    </n-split>
</template>

<script setup>
    import { reactive, ref,watch, unref, toRaw } from 'vue'
    import { NInput, useMessage } from 'naive-ui'

    import { formValueProvider } from "@grid-form/common"
    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    import { RenderDemo } from "./example"

    let { form, result, onSubmit, onFailed, onInited } = RenderDemo()

    const message = useMessage()
    let code = ref(JSON.stringify(toRaw(unref(form)), null, 4))

    const refresh = ()=>{
        Object.assign(form, JSON.parse(code.value))
        message.info(`表单已刷新`)
    }
</script>

<style>
    .p10 {
        padding: 10px; margin:0px auto;
    }
</style>
