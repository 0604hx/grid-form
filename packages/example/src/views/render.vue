<template>
    <div style="padding: 10px; margin:0px auto;">
        <n-card title="表单渲染示例（Naive UI）" :segmented="{content: true}">
            <FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
        </n-card>

        <!-- <n-divider title-placement="center">基于 Vant4 的渲染示例</n-divider>
        <VantRender :renders="VantRenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug /> -->

        <n-divider title-placement="center">表单反馈输出</n-divider>
        <div v-if="result.title">
            <n-tag :type="result.type">{{result.title}}</n-tag>

            {{result.data}}
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref,watch } from 'vue'
    import { NInput } from 'naive-ui'

    import { formValueProvider } from "@grid-form/common"
    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    import { RenderDemo } from "./example"

    let { form, result, onSubmit, onFailed, onInited } = RenderDemo()
</script>
