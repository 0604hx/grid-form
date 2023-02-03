<template>
    <DataRender :items="items" />
</template>

<script setup>
    import { ref } from 'vue'

    import { DataRender } from "@grid-form/render-data"
    import "@grid-form/render-data/md-css/vue-pro.css"

    import { demoLayouts } from "./demo"

    const items = demoLayouts()
</script>
