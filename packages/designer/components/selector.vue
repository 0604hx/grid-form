<template>
    <n-popover ref="popover" placement="bottom" trigger="click">
        <template #trigger>
            <n-button secondary type="primary" circle><template #icon><n-icon :component="Plus" /></template> </n-button>
        </template>
        <n-grid class="p-3" :cols="3" x-gap="6" y-gap="6">
            <template  v-for="item in components">
                <n-gi :span="3">{{item.label}}</n-gi>
                <n-gi v-for="com in item.items">
                    <n-button secondary @click="onSelect(com)" class="w-full">
                        <template #icon><n-icon :color="com.script?scriptColor:null" :component="com.icon" /></template>
                        {{com.label}}
                    </n-button>
                </n-gi>
            </template>
        </n-grid>

        <n-text depth="3">图标为<span :style="{color: scriptColor, fontSize: '1.25rem'}">■</span>的组件支持自定义脚本交互</n-text>
    </n-popover>
</template>

<script setup>
    import { ref, h } from 'vue'
    import { Plus } from "@vicons/fa"

    import { scriptColor } from "../component"

    const emits = defineEmits(['select'])
    const props = defineProps({
        components:{type:Array},
    })

    const popover = ref()

    const onSelect = row=>{
        emits("select", row)
        popover.value.setShow(false)
    }
</script>
