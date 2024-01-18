<template>
    <n-grid :x-gap="gridGap" :y-gap="gridGap" :cols="form.grid" :style="{width: form.width, margin:'0px auto' }">
        <template v-for="(item, index) in form.items" :key="index">
            <n-form-item-gi v-if="item._hide!=true" :span="item._col" :show-feedback="false" :show-label="!(item._hideLabel === true || !form.labelShow)">
                <template #label>
                    {{item._text}}<span v-if="item._required" style="color: red;"> *</span>
                </template>

                <component v-if="item._container && item.items" :is="buildComponent(item, renders[item._widget], false)">
                    <render-container :gridGap="gridGap" :renders="renders" :form="item" :formData="formData" />
                </component>
                <component v-else v-model:value="formData[item._uuid]" :is="buildComponent(item, renders[item._widget], false)" />
            </n-form-item-gi>
        </template>
    </n-grid>
</template>

<script>
    export default { name:"render-container" }
</script>

<script setup>
    import { ref } from 'vue'

    import { RenderProps } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps({
        renders:{type:Object},
        form: {type:Object},
        gridGap: {type:Number, default: 10},
        formData: {type:Object}
    })
</script>
