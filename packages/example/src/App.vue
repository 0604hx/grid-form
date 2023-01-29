<template>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN" :hljs="hljs">
        <div style="min-height: 100%;">
            <router-view></router-view>
        </div>
    </n-config-provider>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { darkTheme, useOsTheme, zhCN, dateZhCN } from 'naive-ui'

    import hljs from 'highlight.js/lib/core'
    import javascript from 'highlight.js/lib/languages/javascript'

    let osTheme     = useOsTheme()
    let theme = computed(()=> {
        let h = new Date().getHours()
        let _theme =  osTheme.value === 'dark'? darkTheme : (h>=18||h<=8? darkTheme: null)

        if(_theme != null)
            document.querySelector("body").classList.add("dark")

        return _theme
    })

    onMounted(()=> console.debug(theme))
</script>
