<template>
    <div v-if="title" class="title">{{ title }}</div>
    <template v-for="item in form.items">
        <template v-if="!unavailables.includes(item._widget)">
            <render-container v-if="item._container && item.items" :form="item" :formData="childForm(item)" :showIcon :level="level+1" :title="item.title"/>
            <div v-else class="item">
                <div v-if="clazz" class="item_level" :class="clazz">
                    {{ !(item._widget=='IMAGE' || item._widget=='TABLE')?"|":"" }}
                </div>

                <span v-if="item._widget==='TEXT'" v-html="item._value"></span>
                <ImageWidget v-else-if="item._widget==='IMAGE'" :src="item.src" :full="item.full" :maxHeight="item.maxHeight" :height="item.height" />
                <TableWidget v-else-if="item._widget==='TABLE'" :content="item.content"/>
                <template v-else>
                    <span class="label">{{ item._text||item._widget }}</span>
                    <Input v-if="inputs.includes(item._widget)" :type="toLowercase(item._widget)" v-model="formData[item._uuid]" />
                    <Select v-else-if="item._widget==='SELECT'" v-model="formData[item._uuid]" :options="buildOptions(item.options)" />
                    <Checkbox v-else-if="item._widget==='CHECKBOX'" v-model="formData[item._uuid]" :options="buildOptions(item.options)" />
                    <Radio v-else-if="item._widget==='RADIO'" v-model="formData[item._uuid]" :options="buildOptions(item.options)" />
                    <Radio v-else-if="item._widget==='SWITCH'" v-model="formData[item._uuid]" switch />
                    <span v-else class="empty"></span>

                    <Icon v-if="showIcon" :type="item._widget" />
                </template>
            </div>
        </template>
    </template>
</template>

<script>
    export default {
        name:"render-container",
        inheritAttrs: false
    }
</script>

<script setup>
    import { ContainerMixin } from '@grid-form/common/render.mixin'
    import { buildComponent, buildOptions } from '@grid-form/common'

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
        level: {type:Number, default: 0}
    })
    const { isMultiple, canAdd, childForm, onAddRow } = ContainerMixin(props)

    const clazz = props.level == 0?"":`item_level_${props.level}`
    const inputs = ["INPUT", "NUMBER", "DATE"]
    const unavailables = ["BUTTON", "ALERT", "DIVIDER", "RATE"]

    const toLowercase = v=> v.toLowerCase()
</script>
