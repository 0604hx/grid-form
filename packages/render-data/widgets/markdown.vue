<!--展示 MARKDOWN 格式的数据-->
<template>
    <div class="markdown-body" v-html="marked(content)"></div>
</template>

<script setup>
    import { marked } from 'marked'

    const props = defineProps({content:{type:String}})
</script>
