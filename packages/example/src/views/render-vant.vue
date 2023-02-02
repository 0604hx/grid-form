<template>
    <div style="padding: 10px; margin:0px auto; width: 500px;">
        <VantRender style="border: 1px solid #dadada; border-radius: 4px;" :renders="VantRenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />

        <van-divider title-placement="center">表单反馈输出</van-divider>
        <div v-if="result.title">
            <div>
                <van-tag :type="type">
                    {{result.title}}
                </van-tag>
                <span v-if="result.data['提交类型']" style="margin-left: 10px;">提交类型={{result.data['提交类型']}}</span>
            </div>

            <van-cell-group v-if="result.data['表单数据']">
                <van-cell v-for="(value, key) in result.data['表单数据']" :title="key" :value="value" />
            </van-cell-group>
            <template v-else>{{result.data}}</template>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'

    import { FormRender as VantRender, RenderFuncs as VantRenderFuncs } from "@grid-form/render-vant"
    import { RenderDemo } from "./example"

    let { form, result, onSubmit, onFailed, onInited } = RenderDemo()

    let types = {"info":"primary", "error":"danger"}
    let type = computed(()=> types[result.type] || result.type )
</script>
