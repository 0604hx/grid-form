<template>
    <van-field :label="label" :disabled="disabled">
        <template #input>
            <van-checkbox-group v-model="shadow" @change="onChange">
                <van-space wrap :direction="vertical?'vertical':'horizontal'">
                    <van-checkbox v-for="(op, opIndex) in options" :name="op.value" shape="square">{{op.label}}</van-checkbox>
                </van-space>
            </van-checkbox-group>
        </template>
    </van-field>
</template>

<script setup>
    import { ref } from 'vue'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: Array, default:undefined},
        label:{type:String, default:"复选框"},
        options:{type:Array},
        disabled:{type:Boolean, default: false},
        vertical:{type:Boolean, default:false}
    })

    let shadow = ref(props.modelValue)

    const onChange = names=> {
        emits("update:modelValue", names)
    }
</script>
