<template>
    <span :style="{display: 'flex', alignItems: 'center', margin}">
        {{text}}
    </span>
</template>

<script setup>
    const props = defineProps({
        text:String,
        margin:{type:String, default:"0px 12px 0px 0px"}
    })
</script>
