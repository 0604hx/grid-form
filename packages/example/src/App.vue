<template>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="customVars" :hljs="hljs">
        <n-dialog-provider>
            <n-message-provider>
                <div style="min-height: 100%;">
                    <router-view></router-view>
                </div>
            </n-message-provider>
        </n-dialog-provider>
    </n-config-provider>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { darkTheme, useOsTheme, zhCN, dateZhCN } from 'naive-ui'

    import hljs from 'highlight.js/lib/core'
    import javascript from 'highlight.js/lib/languages/javascript'

    //如需使用请通过 'npm i -S highlight.js' 安装组件
    hljs.registerLanguage('javascript', javascript)

    let osTheme     = useOsTheme()
    let theme = computed(()=> {
        let h = new Date().getHours()
        let _theme =  osTheme.value === 'dark'? darkTheme : (h>=18||h<=8? darkTheme: null)

        if(_theme != null)
            document.querySelector("body").classList.add("dark")

        return _theme
    })

    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    let customVars  = {
        // common: {
        //     primaryColor: '#1677ff',
        //     primaryColorHover: '#40a9ff',
        //     primaryColorPressed: '#0050b3',
        //     primaryColorSuppl: '#1677ff'
        // }
    }
</script>
