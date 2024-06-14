<template>
    <div class="input">
        <template v-for="(o, i) in options">
            <input type="checkbox" :id="toId(i)" :value="o.value" v-model="selected" @change="onChange"/>
            <label :for="toId(i)" class="mr-10">{{ o.label }}</label>
        </template>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const model = defineModel()
    const props = defineProps({
        options:{type:Array}
    })

    let selected = ref([])

    const onChange = v=> model.value = selected.value

    const idPrefix = Date.now()
    const toId = i=> `S_${idPrefix}_${i}`
</script>
