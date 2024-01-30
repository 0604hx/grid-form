<template>
    <n-form :show-feedback="false" :label-width="100" label-placement="left">
        <n-collapse v-if="mode==1" :default-expanded-names="names" :on-update:expanded-names="onClick">
            <n-collapse-item v-for="(group, gIndex) in items" :key="gIndex" :title="group.label" :name="group.id">
                <n-space vertical :size="compact?'small':'medium'">
                    <!-- <component v-for="item in group.items" :is="buildLine(item)" /> -->
                    <AttrLine v-for="item in group.items" :label="item.label" v-model:value="bean[item.id]" :summary="item.summary" :placeholder="item.placeholder"
                        :widget="item.widget" :prefix="item.prefix" :suffix="item.suffix" :options="item.options" :rows="item.rows"
                    />
                </n-space>
            </n-collapse-item>
        </n-collapse>
        <div v-else-if="mode==0" class="text-center"><n-spin></n-spin></div>
        <div v-else class="text-center">
            <n-text depth="3">请选择左侧控件以编辑属性</n-text>
        </div>
    </n-form>
</template>

<script setup>
    import { ref, computed, watch, nextTick, h } from 'vue'
    import { NSpace, NCollapse, NCollapseItem, NText, NSpin, NForm } from 'naive-ui'

    import AttrLine from "./components/attribute-line.vue"

    const emits = defineEmits([])
    const props = defineProps({
        bean: {type:Object},
        items: {type:Array, default:[]},
        compact:{type:Boolean, default: false}
    })

    let mode = ref(-1)
    let names = ref(['basic'])

    // let lines = [
    //     {
    //         label:"基本信息", key:"basic",
    //         items:[
    //             { label:"表单名称", key:"_uuid", widget:"TEXT" },
    //             { label:"中文名称", key:"_text", widget:"TEXT" },
    //             { label:"所占列数", key:"_col", widget:"NUMBER", min:1, max: 24, suffix:"列"},
    //             { label:"提示信息", key:"placeholder", widget:"TEXT" },
    //         ]
    //     }
    // ]

    let onClick = v=> names.value = v
    // let buildLine = item=>{
    //     console.debug(item, props.bean[item.id])
    //     let ps = {
    //         modelValue: props.bean[item.id]
    //         // "onUpdate:modelValue":v=>{}
    //     }
    //     for(let k in item){
    //         if(k!='id') ps[k] = item[k]
    //     }
    //     return h(AttrLine, Object.assign(ps, item) )
    // }

    watch(()=> props.bean, v=>{
        mode.value = 0
        nextTick(()=> mode.value = 1)
    })
</script>
