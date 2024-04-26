<template>
    <!-- {{form}} -->
    <template v-if="isMultiple">
        <div v-for="(rowData, rowIndex) in formData">
            <var-form :label-width="form.labelWidth" :label-align="position">
                <Space direction="column">
                    <template v-for="(item, index) in form.items">
                        <template v-if="item._hide != true">
                            <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                                <render-container :renders="renders" :form="item" :formData="childForm(item)" :lockLabelPlacement="lockLabelPlacement" />
                            </component>
                            <component v-else v-model="rowData[item._uuid]" :is="buildComponent(item, renders, false)" />
                        </template>
                    </template>
                </Space>
            </var-form>
            <div style="text-align: right;">
                <var-button round size="small" text :title="`第`+(rowIndex+1)+`行，点此删除`" type="danger" @click="formData.splice(rowIndex, 1)">
                    <var-icon name="trash-can-outline" />
                </var-button>
            </div>
        </div>
        <div style="margin-top: 10px; text-align: center;">
            <var-button round :disabled="!canAdd" @click.stop="onAddRow" type="primary">
                <var-icon name="plus" />
            </var-button>
        </div>
    </template>
    <var-form v-else :label-width="form.labelWidth" :label-align="position">
        <Space direction="column">
            <template v-for="(item, index) in form.items">
                <template v-if="item._hide != true">
                    <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                        <render-container :renders="renders" :form="item" :formData="childForm(item)" :lockLabelPlacement="lockLabelPlacement" />
                    </component>
                    <component v-else v-model="formData[item._uuid]" :is="buildComponent(item, renders, false)" />
                </template>
            </template>
        </Space>
    </var-form>
</template>

<script>
    export default { name:"render-container" }
</script>

<script setup>
    import { computed } from 'vue'
    import { Form as VarForm, Button as VarButton, Space, Icon as VarIcon } from '@varlet/ui'

    import { ContainerProps, ContainerMixin } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps(ContainerProps)

    /**
     * naive使用 labelPlacement、labelAlign 两个属性限定表单标签的位置、对齐方式
     * vant4 则只使用 label-align （top、left、right），此处进行一个转换
     */
    const position = computed(()=> {
        if(!!props.lockLabelPlacement)  return props.lockLabelPlacement

        let { labelPlacement, labelAlign } = props.form
        return labelPlacement === 'top'? labelPlacement : labelAlign
    })

    const { isMultiple, canAdd, childForm, onAddRow } = ContainerMixin(props)
</script>
