<template>
    <DefineTemplate v-slot="{ useIndent=true }">
        <template v-for="item in form.items">
            <template v-if="item._hide!=true && !unavailables.includes(item._widget)">
                <render-container v-if="item._container && item.items" :form="item" :formData="childForm(item)" :showIcon :level="level+1" :title="item.title" :onScript />
                <div v-else class="item">
                    <div v-if="useIndent && clazz" class="item_level" :class="clazz">
                        {{ !(item._widget=='IMAGE' || item._widget=='TABLE')?"|":"" }}
                    </div>

                    <span v-if="item._widget==='TEXT'" v-html="item._value"></span>
                    <ImageWidget v-else-if="item._widget==='IMAGE'" :src="item.src" :full="item.full" @click="handleClick(item)" :maxHeight="item.maxHeight" :height="item.height" />
                    <TableWidget v-else-if="item._widget==='TABLE'" :content="item.content"/>
                    <template v-else>
                        <span v-if="item._hideLabel != true" class="label">{{ item._text||item._widget }}</span>

                        <Input v-if="inputs.includes(item._widget)" :type="toLowercase(item._widget)" v-model="formData[item._uuid]" />
                        <Select v-else-if="item._widget==='SELECT'" v-model="formData[item._uuid]" :options="buildOptions(item.options)" />
                        <Checkbox v-else-if="item._widget==='CHECKBOX'" v-model="formData[item._uuid]" :options="buildOptions(item.options)" />
                        <Radio v-else-if="item._widget==='RADIO'" v-model="formData[item._uuid]" :options="buildOptions(item.options)" />
                        <Radio v-else-if="item._widget==='SWITCH'" v-model="formData[item._uuid]" switch />
                        <!-- @dblclick="handleClick(item,'dblclick')"  -->
                        <button v-else-if="item._widget==='BUTTON'" class="w-full" style="margin: 5px 0px 5px 0px;" @click="handleClick(item)" :title="item.tip">{{ item.label }}</button>
                        <span v-else class="empty"></span>

                        <Icon v-if="showIcon" :type="item._widget" />
                    </template>
                </div>
            </template>
        </template>
    </DefineTemplate>

    <div v-if="title" class="title">{{ title }}</div>
    <template v-if="isMultiple">
        <table class="sub-table">
            <tr v-for="(rowData, rowIndex) in formData" :class="{striped:rowIndex%2==1}">
                <td width="40" class="rowIndex" @click="toDelRow(rowIndex)" title="点击删除该行数据">
                    {{ rowIndex + 1 }}.&nbsp;&nbsp;
                </td>
                <td>
                    <ReuseTemplate :useIndent="false" />
                </td>
            </tr>
        </table>
        <div style="margin-top: 5px; text-align: center;">
            <button @click.stop="onAddRow">+</button>
        </div>
    </template>
    <template v-else>
        <ReuseTemplate />
    </template>
</template>

<script>
    export default {
        name:"render-container",
        inheritAttrs: false
    }
</script>

<script setup>
    import { createReusableTemplate } from '@vueuse/core'

    import { ContainerMixin } from '@grid-form/common/render.mixin'
    import { buildComponent, buildOptions } from '@grid-form/common'

    const [ DefineTemplate, ReuseTemplate ] = createReusableTemplate()

    import Icon from "./icon.vue"

    import Input from "./widgets/input.vue"
    import Select from "./widgets/select.vue"
    import Checkbox from "./widgets/checkbox.vue"
    import Radio from "./widgets/radio.vue"

    import ImageWidget from "@grid-form/common/widgets/image.vue"
    import TableWidget from "@grid-form/common/widgets/table.vue"

    const props = defineProps({
        title: {type:String},
        form: {type:Object},
        formData: {type:Object},
        showIcon: {type:Boolean, default: true},
        level: {type:Number, default: 0},
        onScript:{type:Function}
    })
    const { isMultiple, canAdd, childForm, onAddRow } = ContainerMixin(props)

    const clazz = props.level == 0?"":`item_level_${props.level}`
    const inputs = ["INPUT", "NUMBER", "DATE"]
    const unavailables = ["ALERT", "DIVIDER", "RATE"]

    const toLowercase = v=> v.toLowerCase()

    const toDelRow = i=> confirm(`删除第${i+1}行数据吗？`) &&  props.formData.splice(i, 1)

    /**
     * 按钮或者图片的点击事件处理
     * 目前仅支持单击
     */
    const handleClick = (item, type='click')=> props.onScript && props.onScript(item, type)
</script>
