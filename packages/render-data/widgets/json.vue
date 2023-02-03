<template>
    <n-code show-line-numbers language="javascript" :code="JSON.stringify(content, null, 4)"></n-code>
</template>

<script setup>
    const props = defineProps({
        content: {type:Object}
    })
</script>
