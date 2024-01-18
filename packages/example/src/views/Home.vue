<template>
    <div style="margin:0px auto; width:920px;">
        <div style="text-align:center;">
            <img src="/logo.svg" />
        </div>
        <n-divider>GRID-FORM 栅栏（格子）表单</n-divider>

        <n-space justify="center">
            <n-button type="primary" secondary size="large" @click="jump('designer')"><template #icon><n-icon :component="Table" /></template> 可视化设计器</n-button>
            <n-button type="primary" secondary size="large" @click="jump('render')"> <template #icon><n-icon :component="Eye" /></template>渲染器 · NAIVE-UI</n-button>
            <n-button type="primary" secondary size="large" @click="jump('element')" disabled> <template #icon><n-icon :component="Eye" /></template>渲染器 · Element Plus</n-button>
            <n-button type="primary" secondary size="large" @click="jump('vant')"> <template #icon><n-icon :component="Eye" /></template>渲染器 · Vant</n-button>
            <n-button type="primary" secondary size="large" tag="a" target="_blank" href="https://github.com/0604hx/grid-form">
                <template #icon><n-icon :component="Github" /></template> 查看源码
            </n-button>
        </n-space>

        <n-steps vertical size="small" style="margin-top:18px;">
            <n-step status="finish" title="可视化设计器">
                基于
                <n-button text type="primary" tag="a" size="large" target="_blank" href="https://www.naiveui.com">
                    <template #icon>
                        <n-icon><img src="/naive-ui.svg" width="20" /></n-icon>
                    </template>
                    Naive UI
                </n-button>
                的表单设计器，所见即所得
            </n-step>
            <n-step status="finish" title="渲染器（naive-ui）">
                基于 Naive UI 组件库实现的表单渲染器（可单独引入）
            </n-step>
            <n-step status="wait" title="渲染器（element-plus）">
                基于
                <n-button text type="info" tag="a" target="_blank" href="https://element-plus.org/zh-CN/">
                    <template #icon>
                        <n-icon><img src="/element-plus.svg" width="20" /></n-icon>
                    </template>
                    Element Plus
                </n-button>
                实现的表单渲染器
            </n-step>
            <n-step status="finish" title="渲染器（Vant 4）">
                基于
                <n-button text type="info" tag="a" target="_blank" href="https://vant-ui.github.io">
                    <template #icon>
                        <n-icon><img src="/vant.png" width="20" /></n-icon>
                    </template>
                    Vant 4
                </n-button>
                实现的表单渲染器（兼容移动端）
            </n-step>
        </n-steps>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { Table, Eye, Github } from '@vicons/fa'

    const router = useRouter()

    let jump = name=> {
        if(name==='vant')   return window.open("/render-vant.html")
        router.push({name})
    }
</script>

<style>
    .n-step--finish-status .n-step-content-header {
        /* color: #333 !important; */
    }
</style>
