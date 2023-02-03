<template>
    <template v-for="item in items">
        <n-card size="small" :title="item.title">
            <component :is="build(item.layout, item.content)" />
        </n-card>
    </template>
</template>

<script setup>
    import { ref, h } from 'vue'

    import { DataWidgets } from "./widgets"

    const emits = defineEmits([])
    const props = defineProps({
        layout: {type:String, default:"list"},
        items: {type:[Array, Object]}
    })

    const build = (layout, content) => layout in DataWidgets? h(DataWidgets[layout], {content} ) : h(DataWidgets['404'],  { layout })
</script>
