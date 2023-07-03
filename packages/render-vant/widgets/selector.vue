<!--弹出选择器-->
<template>
    <template v-if="multiple===false">
        <van-field v-model="shadow" :disabled="disabled" is-link readonly name="picker" :label="label" :placeholder="placeholder" @click="show = true" />
        <van-popup v-model:show="show" position="bottom">
            <van-picker :title="label" :columns="options" @confirm="onConfirm" @cancel="close" />
        </van-popup>
    </template>
    <template v-else>
        <van-field v-model="shadow" :disabled="disabled" is-link readonly :label="label" :placeholder="placeholder" @click="show = true" />
        <van-popup v-model:show="show" position="bottom" :style="{height:'45%'}">
            <div class="van-picker__toolbar">
                <button type="button" class="van-picker__cancel van-haptics-feedback" @click="close">取消</button>
                <div class="van-picker__title van-ellipsis"><b>{{label}}</b></div>
                <button type="button" class="van-picker__confirm van-haptics-feedback" @click="onSelect">确认</button>
            </div>
            <van-checkbox-group v-model="selected" style="height: calc(100% - 45px); overflow-y: auto;">
                <!-- <van-checkbox v-for="o in options" :name="o.value">{{o.text}}</van-checkbox> -->
                <van-cell-group inset>
                    <van-cell v-for="(o, index) in options" clickable :key="o.value" :title="o.text" @click="()=> checkboxRefs[index].toggle()">
                        <template #right-icon>
                            <van-checkbox shape="square" :name="o.value" :ref="el => checkboxRefs[index] = el"  @click.stop />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </van-popup>
    </template>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue'

    const emits = defineEmits(['update:modelValue', 'change'])
    const props = defineProps({
        modelValue:{type: [String, Array], default:undefined},
        label:{type:String, default:"下拉选择"},
        placeholder: {type:String, default:"请选择"},
        disabled:{type:Boolean, default: false},
        options:{type:[String, Array, Object]},
        multiple:{type:Boolean, default: false}
    })

    const buildShadow = v=> Array.isArray(v)? v.join(",") : v

    let show        = ref(false)
    let shadow      = ref(props.modelValue)
    let selected    = ref(props.modelValue??[])

    let checkboxRefs= ref([])

    const onConfirm = ({ selectedOptions }) => {
        show.value = false
        let item = selectedOptions[0]
        emits("update:modelValue", item.value)
        shadow.value = item.text
    }

    const close = ()=> show.value = false
    const onSelect = ()=>{
        let checks = props.options
            .map((o, i)=>{
                let check = checkboxRefs.value[i].checked.value
                return check ? o : undefined
            })
            .filter(v=>!!v)
        emits("update:modelValue", checks.map(v=>v.value))
        shadow.value = checks.map(v=>v.text).join(",")
        show.value = false
    }

    watch(()=> props.modelValue, ()=> {
        if(props.multiple === true && typeof(props.modelValue)==='string')
            selected.value = props.modelValue?.split(",")

        shadow.value = Array.isArray(props.modelValue)? props.modelValue.join(",") : props.modelValue
    })
</script>
