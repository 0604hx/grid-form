<template>
    <Card :title :outline="bordered">
        <template #description>
            <div style="padding: 16px 16px 0px 16px;"> <slot></slot> </div>
        </template>
    </Card>
</template>

<script setup>
    import { Card } from '@varlet/ui'

    const props = defineProps({
        bordered: {type:Boolean, default: true},
        title: String
    })
</script>
