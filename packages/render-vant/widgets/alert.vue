<template>
    <div :style="{backgroundColor, padding, margin:'5px 5px 0px 5px', borderRadius:'4px', position:'relative', display: show?'':'none'}">
        <van-icon :name="icon" size="1.8rem" :color="colors[type]" style="display: flex;position: absolute; top: 18px;" />
        <van-icon v-if="closeable" name="cross" style="position: absolute; top:18px;right:15px; cursor: pointer;" @click="show=false" />

        <div style="padding-left: 40px;">
            <div style="font-size: 1.3rem;">{{title}}</div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'

    const props = defineProps({
        type:{type:String, default:"info"},
        title:{type:String},
        closeable:{type:Boolean, default:false},
        padding:{type:String, default:"10px 14px"}
    })

    const bgColors = {
        info    :"rgba(237, 245, 254, 1)",
        success :"rgba(237, 247, 242, 1)",
        warning :"rgba(254, 247, 237, 1)",
        error   :"rgba(251, 238, 241, 1)"

    }
    const colors = { info:"#2080f0", success:"#18a058", warning:"#f0a020", error:"#d03050" }
    const icons = { success:"checked", error:"clear" }

    const backgroundColor = computed(()=>bgColors[props.type])
    const icon = computed(()=> icons[props.type] || props.type )
    let show = ref(true)
</script>
