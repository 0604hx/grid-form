<!--动态编辑的标签组件-->
<template>
    <el-space wrap style="width: 100%;">
        <el-tag v-for="(tag, i) in items" :key="i" :round="round" :closable="closable" :disable-transitions="false" @close="handleClose(i)">{{ tag }}</el-tag>
        <el-input v-if="editor.using" ref="input" v-model="editor.text" placeholder="请输入"
            @keyup.enter="onInput" @blur="onInput" style="width: 80px;" />
        <el-button v-else @click="toInput" text bg :disabled="overMax" :title="'输入数量上限：'+(max>=0?max:'无限制')"> + </el-button>
    </el-space>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, reactive, nextTick, computed } from 'vue'
    import { ElTag, ElInput, ElButton, ElSpace } from 'element-plus'

    const emits = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue:{type:Array, default:[]},
        // size:{type:String, default:"large"}
        max:{type:Number},
        round:{type:Boolean, default: false},
        closable:{type:Boolean, default: true}
    })

    let editor      = reactive({ using: false, text:"" })
    let items       = ref(props.modelValue)
    let input       = ref()

    const overMax   = computed(()=> props.max>0 && items.value.length>=props.max)

    const handleClose = i=> {
        items.value.splice(i, 1)
        onChange()
    }
    const toInput = ()=>{
        editor.using    = true
        nextTick(()=> input.value?.input?.focus())
    }
    const onInput = ()=>{
        if(!!editor.text){
            items.value.push(editor.text)
            onChange()
        }
        editor.using    = false
        editor.text     = ""
    }
    const onChange = ()=>  emits("update:modelValue", items)
</script>
