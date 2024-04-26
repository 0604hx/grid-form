<template>
    <var-input :placeholder :clearable :variant readonly v-model="shadow" @focus="onClick">
        <template #append-icon>
            <var-icon name="calendar-month" />
        </template>
    </var-input>

    <var-popup position="bottom" v-model:show="show">
        <var-date-picker v-model="shadow" @change="onChange" />
    </var-popup>
</template>

<script setup>
    import { ref } from 'vue'

    import { Input as VarInput, Icon as VarIcon, Popup as VarPopup, DatePicker as VarDatePicker } from '@varlet/ui'

    const emits = defineEmits(['update:modelValue'])
    const props = defineProps({
        modelValue:{type:String},
        placeholder:String,
        disabled:Boolean,
        clearable:Boolean,
        variant:{ type:String, default: "standard"}
    })

    let shadow = ref(props.modelValue)
    let show = ref(false)

    const onClick = ()=> show.value = true
    const onChange = v=> {
        show.value = false
        emits("update:modelValue", v)
    }
</script>
