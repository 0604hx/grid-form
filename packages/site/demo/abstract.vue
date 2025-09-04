<template>
    <ClientOnly>
        <div style="width:680px;margin:0 auto;">
            <uiRender :form :onSubmit />
            <div style="margin-top:12px">
                {{ result }}
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
    import { ref } from 'vue'

    import demoForm from '../components/render/data/demo.js'

    const props = defineProps({
        uiRender: { type:Object },
        form: { type: Object, default:demoForm }
    })

    let result = ref({})
    const onSubmit = (formObj, action)=> result.value = formObj
</script>
