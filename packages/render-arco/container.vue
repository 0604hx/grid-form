<template>
    <template v-if="isMultiple">
        <table class="gf-render-table">
            <tr v-for="(rowData, rowIndex) in formData" :class="{striped:rowIndex%2==1}">
                <td width="40" class="c">
                    <Popconfirm :content="`删除第`+(rowIndex+1)+`行数据？`" cancel-text="我再想想" type="warning" @ok="formData.splice(rowIndex, 1)">
                        <Button size="small" type="primary" shape="circle">{{rowIndex+1}}</Button>
                    </Popconfirm>
                </td>
                <td>
                    <Row :gutter="gridGap" :style="{width: form.width, margin:'0px auto' }">
                        <template v-for="(item, index) in form.items" :key="index">
                            <Col v-if="item._hide!=true" :span="computeSpan(item._col)">
                                <FormItem :content-flex :hide-label="item._hideLabel === true || !form.labelShow" :label="item._text" :required="item._required">
                                    <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                                        <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="childForm(item)" />
                                    </component>
                                    <component v-else v-model="rowData[item._uuid]" :is="buildComponent(item, renders, false)" />
                                </FormItem>
                            </Col>
                        </template>
                    </Row>
                </td>
            </tr>
        </table>
        <div style="margin-top: 10px; text-align: center;">
            <Button size="small" :disabled="!canAdd" shape="circle" @click.stop="onAddRow">+</Button>
        </div>
    </template>
    <Row v-else :gutter="gridGap" :style="{width: form.width, margin:'0px auto' }">
        <template v-for="(item, index) in form.items" :key="index">
            <Col v-if="item._hide!=true" :span="computeSpan(item._col)">
                <FormItem :content-flex :hide-label="item._hideLabel === true || !form.labelShow" :label="item._text" :required="item._required">
                    <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                        <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="childForm(item)" />
                    </component>
                    <component v-else v-model="formData[item._uuid]" :is="buildComponent(item, renders, false)" />
                </FormItem>
            </Col>
        </template>
    </Row>
</template>

<script>
    export default { name:"render-container" }
</script>

<script setup>
    import { computed } from 'vue'
    import { Popconfirm, Button, FormItem, Row, Col } from '@arco-design/web-vue'

    import { ContainerProps, ContainerMixin } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps(ContainerProps)
    const contentFlex = false

    const computeSpan = (col=1)=> Math.min(24, 24*col/props.form.grid)

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
</style>
