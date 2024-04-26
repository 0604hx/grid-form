---
layout: false
---

<script setup>
    window.VARLET_VARIANT = "outlined"

    import { ref } from 'vue'
    import Render from '../components/render/varlet.vue'

    import form from '../components/render/data/student-info.js'

    let result = ref({})
    const onSubmit = (formObj, action)=> result.value = formObj
</script>

<ClientOnly>
    <div style="width:800px;margin:0 auto;">
        <Render :form :onSubmit />
        <div style="margin-top:12px">
            {{ result }}
        </div>
    </div>
</ClientOnly>
