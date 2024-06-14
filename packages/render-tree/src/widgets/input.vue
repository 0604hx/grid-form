<template>
    <input class="input" v-model="model" :type />
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        type:{type:String, default:"text"}
    })
    const model = defineModel()
</script>
