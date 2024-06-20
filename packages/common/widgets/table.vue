<!--简单的二维表格-->
<template>
    <table class="grid-table w100" :class="{bordered}" :style="{textAlign, fontSize: `${fontSize}px`}">
        <tr v-for="(item, index) in cells" :class="{striped: stripe && index>0 && index%2==0}">
            <th v-if="index==0" v-for="(d, dIndex) in item">{{d}}</th>
            <td v-else v-for="(d, dIndex) in item">
                {{d}}
            </td>
        </tr>
    </table>
</template>

<script>
    export default { inheritAttrs: false }
</script>

<script setup>
    import { ref, computed } from 'vue'

    const props=defineProps({
        content: {type:[Array, String], default:[]},
        textAlign:{type:String, default:"left"},
        fontSize:{type:[String, Number], default:12},
        bordered:{type:Boolean, default: false},
        stripe:{type:Boolean, default:true}
    })

    const cells = computed(()=>{
        let isArr = Array.isArray(props.content)
        if(isArr && Array.isArray(props.content[0]))   return props.content

        return (isArr? props.content: props.content.split("\n")).map(line=>{
            let cols = line.split(",").map(v=>v.trim())
            return cols
        })
    })
</script>

<style>
    @import './table.css';
</style>
