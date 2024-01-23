<template>
    <van-form :label-width="form.labelWidth" :label-align="form.labelPlacement">
        <template v-for="(item, index) in form.items">
            <template v-if="item._hide != true">
                <component v-if="item._container && item.items" :is="buildComponent(item, renders, false)">
                    <render-container :renders="renders" :form="item" :formData="formData" />
                </component>
                <component v-else v-model="formData[item._uuid]" :is="buildComponent(item, renders, false)" />
            </template>
        </template>
    </van-form>
</template>

<script>
    export default { name:"render-container" }
</script>

<script setup>
    import { RenderProps } from '@grid-form/common/render.mixin'
    import { buildComponent } from '@grid-form/common'

    const props = defineProps({
        renders:{type:Object},
        form: {type:Object},
        formData: {type:Object}
    })
</script>
