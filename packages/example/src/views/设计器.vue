<template>
    <Designer :renders="RenderFuncs" :components="Components" :context-menu="true" @save="onSave" :review="true" :enableCtrlS="true"
        :compact="false" :form="form" style="height: 100vh;" debug show-footer :footer-height="45"></Designer>
</template>

<script setup>
    import { reactive, onMounted, onUnmounted } from 'vue'
    import { Designer, Components } from "@grid-form/designer"
    import { RenderFuncs } from "@grid-form/render-naive"
    import { createForm } from "@grid-form/common"

    // 如需扩展 RenderFuncs、Components ，请自行扩写

    let form = reactive(createForm())

    const onSave = data=> console.debug("表单信息", data)
</script>
