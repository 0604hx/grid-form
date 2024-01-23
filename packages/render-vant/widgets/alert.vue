<!--
    山寨 naive-ui 的 Alert 组件
    https://www.naiveui.com/zh-CN/light/components/alert
-->
<template>
    <div :class="cls" :style="{backgroundColor, padding, margin:'5px 5px 0px 5px', borderRadius:'4px', position:'relative', display: show?'':'none'}">
        <van-icon v-if="showIcon" :name="icon" size="1.7rem" :color="colors[type]" style="display: flex;position: absolute; top: 12px;" />
        <van-icon v-if="closeable" name="cross" style="position: absolute; top:18px;right:15px; cursor: pointer;" @click="show=false" />

        <div :style="{paddingLeft: showIcon?'36px':'0px' }">
            <div style="font-size: 1.2rem;" class="gf-alert-title">{{title}}</div>
            <div class="gf-alert-content" style="margin-top:8px;">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, computed } from 'vue'

    const props = defineProps({
        type:{type:String, default:"info"},
        title:{type:String},
        showIcon:{type:Boolean, default: true},
        closeable:{type:Boolean, default:false},
        padding:{type:String, default:"10px 14px"}
    })

    const bgColors = {
        info    :"rgba(237, 245, 254, 1)",
        success :"rgba(237, 247, 242, 1)",
        warning :"rgba(254, 247, 237, 1)",
        error   :"rgba(251, 238, 241, 1)",

        info2   :"rgba(56, 137, 197, 0.25)",
        success2:"rgba(42, 148, 125, 0.25)",
        warning2:"rgba(240, 138, 0, 0.25)",
        error2  :"rgba(208, 58, 82, 0.25)"
    }
    const colors = { info:"#2080f0", success:"#18a058", warning:"#f0a020", error:"#d03050" }
    const icons = { success:"checked", error:"clear" }

    const cls = computed(()=> `gf-alert gf-alert-${props.type}`)
    const backgroundColor = computed(()=>{
        let isDark = document.querySelector("html").classList.contains("van-theme-dark")
        return bgColors[`${props.type}${isDark?'2':''}`]
    })
    const icon = computed(()=> icons[props.type] || props.type )
    let show = ref(true)
</script>

<style scoped>
    .gf-alert .gf-alert-content {
        font-size: 14px;
    }
</style>
