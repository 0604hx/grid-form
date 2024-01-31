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

    let onClick = v=> names.value = v

    watch(()=> props.bean, v=>{
        mode.value = 0
        nextTick(()=> mode.value = 1)
    })
</script>
