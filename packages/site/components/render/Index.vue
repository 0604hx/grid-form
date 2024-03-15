<template>
    <n-split class="render-div" direction="horizontal" style="height: 100vh" :max="0.75" :min="0.25" :resize-trigger-size="3">
        <template #1>
            <n-split direction="vertical" style="height: 100%" :default-size="0.8" :resize-trigger-size="1">
                <template #1>
                    <n-tabs type="line" animated>
                        <n-tab-pane tab="NaiveUI" name="naive" display-directive="if">
                            <!-- <div style="height: 800px; background: magenta;"></div> -->
                            <NaiveRender class="p10" :form :initValue :onInited :onSubmit :onFailed />
                        </n-tab-pane>
                        <n-tab-pane tab="Element Plus" name="element" display-directive="if">
                            <ElementRender class="p10" :form :initValue :onInited :onSubmit :onFailed />
                        </n-tab-pane>
                        <n-tab-pane tab="Vant4（移动端）" name="vant" display-directive="if">
                            <VantRender :form :initValue :onInited :onSubmit :onFailed />
                        </n-tab-pane>
                    </n-tabs>
                </template>
                <template #2>
                    <n-card style="height: 100%;" content-style="height: calc(100% - 50px);overflow-y:auto;" size="small" title="表单反馈输出">
                        <template #header-extra>
                            <n-button v-if="result.action" type="primary" secondary size="small">{{ result.action }}</n-button>
                        </template>
                        {{result.data}}
                    </n-card>
                </template>
            </n-split>
        </template>
        <template #2>
            <n-card title="表单源代码（从可视化编辑器中导出）" size="small">
                <template #header-extra>
                    <n-button type="primary" @click="refresh">重绘表单</n-button>
                </template>
                <n-input type="textarea" style="height: calc(100vh - 70px);" v-model:value="code" size="small" />
            </n-card>
        </template>
    </n-split>
</template>

<script setup>
    import { ref, reactive, toRaw, unref } from 'vue'
    import { NSplit, NCard, NTag, NButton, NInput, NTabs, NTabPane, useMessage } from 'naive-ui'

    import { createForm } from "@grid-form/common"

    import "."
    import StudentInfo from './data/student-info.js'

    import NaiveRender from './naiveui.vue'
    import ElementRender from './elementplus.vue'
    import VantRender from './vant4.vue'

    const message = useMessage()

    // 给表单项增加 onSubmit ，赋值函数（也可以是 代码字符串）
    StudentInfo.onSubmit = (form)=>{
        if(!form.name || form.age<18){
            message.warning(`姓名不能为空或者年龄不能小于 18`)
            return false
        }

        return true
    }

    const initValue = { origin:"中国" } //educates:[{type:"小学", from:"", to:"", school:"广西大学附属小学"}]

    // 如需扩展 RenderFuncs、Components ，请自行扩写
    let form = reactive(StudentInfo)
    let code = ref(JSON.stringify(toRaw(unref(form)), null, 4))
    let result = reactive({data:{}, action:""})

    const onInited = ()=> Object.assign(result, {data:"表单渲染完成^.^" })
    const onSubmit = (formObj, action)=> Object.assign(result, {data:JSON.stringify(toRaw(formObj)), action})
    const onFailed = data=>  Object.assign(result, { data })

    const refresh = ()=>{
        Object.assign(form, JSON.parse(code.value))
        message.info(`表单已刷新`)
    }
</script>

<style>
    .render-div {
        .n-tabs, .n-tab-pane {
            height: 100%;
        }
        .n-tab-pane {
            overflow: auto;
            padding: 10px;
        }
        .p10 {
            padding: 10px;
        }
        .result {
            height: calc(100% - 50px);
        }
    }
</style>
