<template>
    <template v-if="isMultiple">
        <table class="gf-render-table">
            <tr v-for="(rowData, rowIndex) in formData" :class="{striped:rowIndex%2==1}">
                <td width="40" class="c">
                    <NPopconfirm :negative-text="null" @positive-click="formData.splice(rowIndex, 1)">
                        <template #trigger>
                            <n-button size="small" type="primary" tertiary circle>{{rowIndex+1}}</n-button>
                        </template>
                        删除第{{rowIndex+1}}行数据？
                    </NPopconfirm>
                </td>
                <td>
                    <n-grid :x-gap="gridGap" :y-gap="gridGap" :cols="form.grid" :style="{width: form.width, margin:'0px auto' }">
                        <template v-for="(item, index) in form.items" :key="index">
                            <NFormItemGridItem v-if="item._hide!=true" :span="item._col" :show-feedback="false" :show-label="!(item._hideLabel === true || !form.labelShow)"
                                :label-placement="form.labelPlacement" :label-align="form.labelAlign" :label-width="form.labelWidth">
                                <template #label>
                                    {{item._text}}<span v-if="item._required" style="color: red;"> *</span>
                                </template>

                                <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                                    <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="childForm(item)" :labelPlacement="item.labelPlacement" :labelAlign="item.labelAlign" />
                                </component>
                                <component v-else-if="item._widget=='DATE'" v-model:formatted-value="rowData[item._uuid]" :is="buildComponent(item, renders, false)" />
                                <component v-else v-model:value="rowData[item._uuid]" :is="buildComponent(item, renders, false)" />
                            </NFormItemGridItem>
                        </template>
                    </n-grid>
                </td>
            </tr>
        </table>
        <div style="margin-top: 10px; text-align: center;">
            <n-button size="small" :disabled="!canAdd" circle @click.stop="onAddRow">+</n-button>
        </div>
    </template>
    <template v-else>
        <n-grid :x-gap="gridGap" :y-gap="gridGap" :cols="form.grid" :style="{width: form.width, margin:'0px auto' }">
        <template v-for="(item, index) in form.items" :key="index">
            <NFormItemGridItem v-if="item._hide!=true" :span="item._col" :show-feedback="false" :show-label="!(item._hideLabel === true || !form.labelShow)"
                :label-placement="form.labelPlacement" :label-align="form.labelAlign" :label-width="form.labelWidth">
                <template #label>
                    {{item._text}}<span v-if="item._required" style="color: red;"> *</span>
                </template>

                <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                    <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="childForm(item)" :labelPlacement="item.labelPlacement" :labelAlign="item.labelAlign" />
                </component>
                <component v-else-if="item._widget=='DATE'" v-model:formatted-value="formData[item._uuid]" :is="buildComponent(item, renders, false)" />
                <component v-else v-model:value="formData[item._uuid]" :is="buildComponent(item, renders, false)" />
            </NFormItemGridItem>
        </template>
    </n-grid>
    </template>
</template>

<script>
    export default {
        name:"render-container",
        inheritAttrs: false
    }
</script>

<script setup>
    import { ref, computed } from 'vue'
    import { NPopconfirm, NButton, NGrid, NFormItemGridItem } from 'naive-ui'

    import { ContainerProps, ContainerMixin } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps(ContainerProps)

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
        border-bottom:1px solid #ebeef5;
        padding: 8px;
    }
    .gf-render-table .striped {
        background: #fafafa;
    }
</style>
