<template>
    <!--element-plus 表单在只有一个输入框时，按下回车会自动提交表单，添加 @submit.prevent 阻止此行为-->
    <el-form :size="computeSize" :label-width="form.labelWidth" class="grid-render" :label-position="position" @submit.prevent>
        <el-row :gutter="gridGap" :style="{width: form.width, margin:'0px auto' }">
            <template v-for="(item, index) in form.items" :key="index">
                <el-col :span="computeSpan(item._col)">
                    <el-form-item :label-width="!(item._hideLabel === true || !form.labelShow)? form.labelWidth : '0px'" :label="item._text" :required="item._required">
                        <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                            <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="formData" />
                        </component>
                        <component v-else v-model="formData[item._uuid]" :is="buildComponent(item, renders, false)" />
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script>
    export default { name:"render-container" }
</script>

<script setup>
    import { ref, computed } from 'vue'

    import { RenderProps } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps({
        renders:{type:Object},
        form: {type:Object},
        gridGap: {type:Number, default: 10},
        formData: {type:Object}
    })

    const computeSpan = col=> 24*col/props.form.grid
    const computeSize = computed(()=> !props.form.size || props.form.size=='medium'?"default": props.form.size)

    /**
     * naive使用 labelPlacement、labelAlign 两个属性限定表单标签的位置、对齐方式
     * element 则只使用 labelPosition （top、left、right），此处进行一个转换
     */
    const position = computed(()=> {
        let { labelPlacement, labelAlign } = props.form
        return labelPlacement === 'top'? labelPlacement : labelAlign
    })
</script>
