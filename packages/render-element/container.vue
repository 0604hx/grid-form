<template>
    <!--element-plus 表单在只有一个输入框时，按下回车会自动提交表单，添加 @submit.prevent 阻止此行为-->
    <template v-if="isMultiple">
        <table class="gf-render-table">
            <tr v-for="(rowData, rowIndex) in formData" :class="{striped:rowIndex%2==1}">
                <td width="40" class="c">
                    <el-popconfirm :title="`删除第`+(rowIndex+1)+`行数据？`" :width="180" cancel-button-text="我再想想" confirm-button-text="确定" confirm-button-type="danger" @confirm="formData.splice(rowIndex, 1)">
                        <template #reference>
                            <el-button size="small" type="primary" tertiary circle>{{rowIndex+1}}</el-button>
                        </template>

                    </el-popconfirm>
                </td>
                <td>
                    <el-form :size="computeSize" :label-width="form.labelWidth" class="grid-render" :label-position="position" @submit.prevent>
                        <el-row :gutter="gridGap" :style="{width: form.width, margin:'0px auto' }">
                            <template v-for="(item, index) in form.items" :key="index">
                                <el-col :span="computeSpan(item._col)">
                                    <el-form-item :label-width="!(item._hideLabel === true || !form.labelShow)? form.labelWidth : '0px'" :label="item._text" :required="item._required">
                                        <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                                            <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="childForm(item)" />
                                        </component>
                                        <component v-else v-model="rowData[item._uuid]" :is="buildComponent(item, renders, false)" />
                                    </el-form-item>
                                </el-col>
                            </template>
                        </el-row>
                    </el-form>
                </td>
            </tr>
        </table>
        <div style="margin-top: 10px; text-align: center;">
            <el-button size="small" :disabled="!canAdd" circle @click.stop="onAddRow">+</el-button>
        </div>
    </template>
    <el-form v-else :size="computeSize" :label-width="form.labelWidth" class="grid-render" :label-position="position" @submit.prevent>
        <el-row :gutter="gridGap" :style="{width: form.width, margin:'0px auto' }">
            <template v-for="(item, index) in form.items" :key="index">
                <el-col :span="computeSpan(item._col)">
                    <el-form-item :label-width="!(item._hideLabel === true || !form.labelShow)? form.labelWidth : '0px'" :label="item._text" :required="item._required">
                        <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                            <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="childForm(item)" />
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
    import { computed } from 'vue'
    import { ElPopconfirm, ElForm, ElFormItem, ElRow, ElCol, ElButton } from 'element-plus'

    import { ContainerProps, ContainerMixin } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps(ContainerProps)

    const computeSpan = (col=1)=> 24*col/props.form.grid
    const computeSize = computed(()=> !props.form.size || props.form.size=='medium'?"default": props.form.size)

    /**
     * naive使用 labelPlacement、labelAlign 两个属性限定表单标签的位置、对齐方式
     * element 则只使用 labelPosition （top、left、right），此处进行一个转换
     */
    const position = computed(()=> {
        let { labelPlacement, labelAlign } = props.form
        return labelPlacement === 'top'? labelPlacement : labelAlign
    })

    const { isMultiple, canAdd, childForm, onAddRow } = ContainerMixin(props)
</script>

<style scoped>
    .gf-render-table {
        width: 100%;
        border-collapse: collapse;
    }
    .gf-render-table .c {
        text-align: center;
    }
    .gf-render-table td {
        border-bottom:1px solid #ebeef580;
        padding: 8px;
    }
    /* .gf-render-table .striped {
        background: #fafafa;
    } */
</style>
