<template>
    <n-text>类型为 <n-tag size="small" type="info">{{layout}}</n-tag> 的展示容器未定义</n-text>
</template>

<script setup>
    const props = defineProps({
        layout: {type:String}
    })
</script>
