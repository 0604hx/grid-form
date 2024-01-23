<!--设计器右键菜单-->
<template>
    <!--右键菜单-->
    <n-dropdown placement="bottom-start" trigger="manual" :x="menu.x" :y="menu.y" :options="menuOptions" :show="menu.show"
        :on-clickoutside="()=>menu.show=false" @select="onMenuSelect" size="small" />
</template>

<script setup>
    import { ref, reactive, nextTick } from 'vue'
    import { Trash, CopyRegular, Paste, PlusCircle } from "@vicons/fa"

    import { buildIcon, scriptColor } from "../component"

    const emits = defineEmits(['select'])
    const props = defineProps({
        components:{type:Array}
    })

    const PREFIX = "prefix"
    const SUFFIX = "suffix"
    const LINK   = "@"

    const findWidget = id=> {
        for (const g of props.components) {
            for (const com of g.items) {
                if(com.id == id)
                    return com
            }
        }
        return null
    }

    const createItemMenuOpts = (key)=> props.components.map((group, index)=>({
        label: group.label, key:`${key}-${index}` , //type:"group",
        children: group.items.map(v=>({
            label:  v.label,
            id:     v.id,
            key:    `${key}${LINK}${v.id}`,
            icon:   buildIcon(v.icon, {color: v.script===true?scriptColor:undefined})
        }))
    }))

    const menu = reactive({x:0, y:0, show:false, index:-1, container: undefined})
    const menuOptions = [
        { label:"复制", key:"copy", icon:buildIcon(CopyRegular, {color:"#2080f0"}) },
        { label:"粘贴（前方）", key:"paste", icon:buildIcon(Paste, {color:"#2080f0"}) },
        // { label:"粘贴到后方", key:"copy", icon:buildIcon(Clipboard, {style:"color:blue"}) },
        { type:"divider" },
        {  label:"在前插入", key: PREFIX, icon: buildIcon(PlusCircle, {color:"#18a058"}), children: createItemMenuOpts(PREFIX) },
        {  label:"在后追加", key: SUFFIX, icon: buildIcon(PlusCircle, {color:"#18a058"}), children: createItemMenuOpts(SUFFIX) },
        { type:"divider" },
        { label:"删除", key:"delete", icon: buildIcon(Trash, {color:"#d03050"}) }
    ]


    /**
     * @param {Event} e
     * @param {Number} index - 组件序号
     * @param {Container} container - 组件容器
     */
    const show = (e, index, container)=>{
        e.preventDefault()

        menu.container = container
        menu.x      = e.clientX
        menu.y      = e.clientY
        menu.index  = index
        menu.show   = true
    }

    const onMenuSelect = (key, opt)=>{
        if(key.indexOf(LINK) > 0){
            let ids = key.split(LINK)
            emits("select", ids[0], menu.index + (ids[0]==PREFIX?0:1), findWidget(ids[1]), menu.container)
        }
        else
            emits("select", key, menu.index, undefined, menu.container)

        nextTick(()=>{
            menu.container = null
            menu.index = -1
            menu.show = false
        })
    }

    defineExpose({ show })
</script>
