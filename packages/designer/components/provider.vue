<template>
</template>

<script setup>
    import { useMessage, useDialog } from "naive-ui"

    const _message = useMessage()
    const _dialog = useDialog()

    const message = (msg, type="info") => _message[type](msg)
    const dialog = (ps={title:"操作确认"}) => _dialog.create(ps)

    defineExpose({ message, dialog })
</script>
