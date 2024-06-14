---
layout: false
---

<script setup>
import Designer from '../components/Designer.vue'
</script>

<!-- 
避免出现 window/document not defined 的错误提示，使用 ClientOnly 包裹 
https://vitepress.dev/zh/guide/ssr-compat 
-->
<ClientOnly>
    <Designer />
</ClientOnly>
