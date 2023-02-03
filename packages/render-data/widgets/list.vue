<template>
    <n-list v-for="group in groups" :bordered="false" hoverable :show-divider="true">
        <template #header>{{group.title}}</template>
        <n-list-item v-for="cell in group.cells">
            <template #suffix>
                <n-tag :bordered="false" type="info">{{cell.value}}</n-tag>
            </template>
            <div>{{cell.title}}</div>
            <n-text :depth="3">{{cell.label}}</n-text>
        </n-list-item>
    </n-list>
</template>

<script setup>
    const props = defineProps({content:{Object}})

    const groups = Array.isArray(props.content)? props.content : [props.content]
</script>
