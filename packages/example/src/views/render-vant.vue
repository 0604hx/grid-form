<template>
    <Basic width="500px" title="表单渲染示例（Vant4）">
        <template #left="{ form, onSubmit, onFailed, onInited }">
            <VantRender :renders="VantRenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
        </template>

        <template #result="{ type, title, data }">
            <div>
                <van-tag :type="getType(type)">
                    {{title}}
                </van-tag>
                <span v-if="data['提交类型']" style="margin-left: 10px;">提交类型={{data['提交类型']}}</span>
            </div>

            <template v-if="data['表单数据']">
                {{data['表单数据']}}
            </template>
            <template v-else>{{data}}</template>
        </template>
    </Basic>
</template>

<script setup>
    import { computed } from 'vue'

    import { FormRender as VantRender, RenderFuncs as VantRenderFuncs } from "@grid-form/render-vant"

    import Basic from "./basic.vue"

    let types = {"info":"primary", "error":"danger"}
    let getType = t=> types[t] || t
</script>
