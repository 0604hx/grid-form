<template>
    <div class="container">
        <div class="left" :style="flexStyle">
            <div class="p10">
                <div style="font-size: 1.25rem; text-align: center;padding: 10px;">{{ title }}</div>
                <slot name="left" :form :onSubmit :onFailed :onInited></slot>

                <div class="resultTitle">表单反馈输出</div>
                <div v-if="result.title">
                    <slot name="result" :type="result.type" :title="result.title" :data="result.data"></slot>
                </div>
            </div>
        </div>
        <div class="split"></div>
        <div class="right">
            <div class="p10">
                <textarea class="editor" v-model="code"></textarea>
                <button class="btn" @click="refresh">重绘表单</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch, unref, toRaw } from 'vue'

    import { formValueProvider } from "@grid-form/common"

    import { RenderDemo } from "./example"

    const props = defineProps({
        width: {type:[String, Number], default: "60%"},
        onRefresh:{type:Function},
        title:{type:String, default:"表单渲染示例"}
    })

    let { form, result, onSubmit, onFailed, onInited } = RenderDemo()

    let code = ref(JSON.stringify(toRaw(unref(form)), null, 4))

    let flexStyle = computed(()=> `flex: 0 0 calc(${props.width} - 1px);height: 100%; overflow-y: auto;`)

    const refresh = ()=>{
        Object.assign(form, JSON.parse(code.value))
        props.onRefresh && props.onRefresh()
    }
</script>

<style lang="less">
    .container {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        .resultTitle {
            font-size: 16px; font-weight: bold;margin: 10px 0 10px 0;border-bottom: 1px solid #a3a3a3;
        }
        .split {
            width: 2px;
            background: rgba(255, 255, 255, 0.24);
        }
        .right {
            flex: 1;
            color: black;

            .btn {
                height: 40px;
                width: 100%;
            }
        }
        .editor {
            height: calc(100vh - 70px); width: calc(100% - 5px);
        }
    }

    .p10 {
        padding: 10px; margin:0px auto;
    }
</style>
