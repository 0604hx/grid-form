<template>
    <span @click="()=>show=true"><slot></slot></span>
    <van-popup v-model:show="show" position="bottom">
        <van-date-picker @confirm="onDatePick" v-model="day" :title="title" :min-date="minDate" @cancel="show = false" :columns-type="type"/>
    </van-popup>
</template>

<script setup>
    import { ref } from 'vue'

    const emit = defineEmits(['update:value', 'change'])
    const props = defineProps({
        title:{type:String},
        value: {type:String, default:""},
        type:{type:Array, default:['year', 'month', 'day']},
        minDate:{type:Date}
    })

    let show = ref(false)
    let day = ref(D.dateArray(new Date(props.value)))

    let onDatePick = ({selectedValues}) =>{
        show.value = false
        emit('change', selectedValues.join("-"))
    }
</script>
