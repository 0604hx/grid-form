<!--
    代码编辑器
    更多配置请参考 https://github.com/surmon-china/vue-codemirror
-->
<template>
    <div :style="{ height, width:'100%'}">
        <codemirror
            v-model="code"
            :placeholder="placeholder"
            :style="{ height }"
            :autofocus="autofocus"
            :indent-with-tab="true"
            :tab-size="tabSize"
            :extensions="extensions"
            @change="v=>emits('update:value', v)"
        />
    </div>
</template>

<script setup>
    import { ref,watch } from 'vue'

    import { Codemirror } from 'vue-codemirror'
    import { javascript } from '@codemirror/lang-javascript'

    const emits = defineEmits(['update:value'])
    const props = defineProps({
        value:{type:String, default:""},
        autofocus: {type:Boolean, default:false},
        tabSize:{type:Number, default:4},
        height: {type:String, default:"200px"},
        placeholder:{type:String, default:"请输入代码"},
        codeExtensions: {type:[Array, Object], default:[]}
    })

    const extensions = [javascript(), ...(Array.isArray(props.codeExtensions)?props.codeExtensions:[props.codeExtensions])]
    // if(window.DARD === true)  extensions.push(oneDark)

    let code = ref(props.value)

    watch(()=>props.value, ()=> code.value=props.value)
</script>
