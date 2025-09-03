---
layout: false
---

<script setup>
    import { ref } from 'vue'
    import Render from '../components/render/elementplus.vue'

    import form from '../components/render/data/demo.js'

    let result = ref({})
    const onSubmit = (formObj, action)=> result.value = formObj
</script>

<ClientOnly>
    <div style="width:680px;margin:0 auto;">
        <Render :form :onSubmit />
        <div style="margin-top:12px">
            {{ result }}
        </div>
    </div>
</ClientOnly>
