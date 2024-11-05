<template>
    <n-dialog-provider>
        <n-message-provider>
            <Designer :renders="RenderFuncs" :components="Components" :context-menu="true" @save="onSave" :review="true" :enableCtrlS="true"
                :compact="false" :form="form" style="height: 100vh;" debug show-footer :footer-height="45"
                :codeExtensions
                />
        </n-message-provider>
    </n-dialog-provider>
</template>

<script setup>
    import { reactive, onMounted, onUnmounted } from 'vue'
    import { NMessageProvider, NDialogProvider } from 'naive-ui'

    import { Designer, Components } from "@grid-form/designer"
    import { RenderFuncs } from "@grid-form/render-naive"
    import { createForm } from "@grid-form/common"

    import { autocompletion, completeFromList, snippetCompletion as snip } from "@codemirror/autocomplete"

    // 如需扩展 RenderFuncs、Components ，请自行扩写
    let form = reactive(createForm())

    const onSave = data=> console.debug("表单信息", data)

    /**
     * 代码编辑器扩展
     */
    const codeExtensions = autocompletion({
        override: [
            // jsLang.extension[1][0].value.autocomplete,
            completeFromList([
                snip("console.debug(`${}`)", {label:"console.debug", info:"打印DEBUG日志"}),
            ])
        ]
    })
</script>
