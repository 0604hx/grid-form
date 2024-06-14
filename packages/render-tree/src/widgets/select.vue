<template>
    <select class="input" v-model="model">
        <option v-for="o in options" :value="o.value">{{ o.label }}</option>
    </select>
</template>

<script setup>
    import { ref } from 'vue'

    const model = defineModel()
    const props = defineProps({
        options:{type:Array}
    })
</script>
