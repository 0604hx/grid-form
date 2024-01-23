<template>
    <van-field v-model="shadow" :disabled="disabled" is-link readonly :label="label" :placeholder="placeholder"  @click="show=true" />
    <van-popup v-model:show="show" position="bottom">
        <van-date-picker @confirm="onDatePick" v-model="day" :title="label" :min-date="minDate" @cancel="show = false" :columns-type="type"/>
    </van-popup>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref } from 'vue'

    const emit = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: String, default:undefined},
        label:{type:String, default:"下拉选择"},
        placeholder: {type:String, default:"请选择"},
        type:{type:Array, default:['year', 'month', 'day']},
        disabled:{type:Boolean, default: false},
        minDate:{type:Date}
    })

    let dateArray = d => {
        if(props.type.length==3)                            return [d.getFullYear()+"", `${d.getMonth()+1}`, d.getDate()+""]
        if(props.type.length==2 && props.type[0]=='year')   return [d.getFullYear()+"", `${d.getMonth()+1}`]
        if(props.type.length==1 && props.type[0]=='year')   return [d.getFullYear()+""]
    }

    let show = ref(false)
    let day = ref(dateArray(props.modelValue? new Date(props.modelValue): new Date()))
    let shadow = ref(props.modelValue)

    let onDatePick = ({selectedValues}) =>{
        show.value = false
        let v = selectedValues.join("-")
        shadow.value = v
        emit('update:modelValue', v)
    }
</script>
