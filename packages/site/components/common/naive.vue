<template>
    <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
        <NMessageProvider>
            <slot></slot>
        </NMessageProvider>
    </NConfigProvider>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue'
    import { NConfigProvider, NMessageProvider, darkTheme, zhCN, dateZhCN } from 'naive-ui'
    import { useData } from 'vitepress'

    const { isDark } = useData()

    let theme = ref(isDark.value === true ? darkTheme:null)
    watch(isDark, v=> theme.value = isDark.value === true ? darkTheme:null)
</script>

