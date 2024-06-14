<template>
    <div class="input">
        <template v-for="(o, i) in getOptions()">
            <input type="radio" :id="toId(i)" :value="o.value" v-model="model" />
            <label :for="toId(i)" class="mr-10">{{ o.label }}</label>
        </template>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const model = defineModel()
    const props = defineProps({
        options:{type:Array},
        switch:{type:Boolean, default: false}
    })

    const idPrefix = Date.now()
    const toId = i=> `R_${idPrefix}_${i}`

    const getOptions = ()=> props.switch? [{label:"是", value:true},{label:"否", value:false}] : props.options
</script>
