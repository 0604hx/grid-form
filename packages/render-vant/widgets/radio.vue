<template>
    <van-field :label="label">
        <template #input>
            <van-radio-group @change="onChange" v-model="shadow" :direction="vertical?'vertical':'horizontal'">
                <van-radio v-for="item in options" :name="item.value">{{item.label}}</van-radio>
            </van-radio-group>
        </template>
    </van-field>
</template>

<script setup>
    import { ref } from 'vue'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: [String, Number], default:undefined},
        label:{type:String, default:"单选框"},
        options:{type:Array},
        vertical:{type:Boolean, default:false}
    })

    let shadow = ref(props.modelValue)
    const onChange = v=> emits("update:modelValue", v)
</script>
