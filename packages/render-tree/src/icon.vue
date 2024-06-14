<template>
    {{ icon }}
</template>

<script setup>
    const props = defineProps({type:String})

    const icons = {
        "INPUT"     : "🔠",
        "NUMBER"    : "🔢",
        "SELECT"    : "🔽",
        "RADIO"     : "🔘",
        "DATE"      : "📅",
        "CHECKBOX"  : "✅",
        "SWITCH"    : "🔘",
        "CARD"      : "🗁",
    }
    const icon = icons[props.type]||""
</script>
