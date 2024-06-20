<template>
    <div v-if="inited" class="grid-render-tree">
        <Container :form="form" :formData="formData" :showIcon :onScript :debug />

        <div style="margin-top:10px;text-align: center;"><button type="submit" @click="toSubmit">{{form.submitText}}</button></div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from "./container.vue"

    const emits = defineEmits(RenderEvent)
    const props = defineProps(
        Object.assign(
            {
                fontSize: {type:String, default:"14rpx"},
                showIcon: {type:Boolean, default: true},        //是否显示图标
                indent: {type:Number, default: 30},             //层级缩进，单位 px
                indentColor:{type:String, default:"#FFFFFF"},   //层级缩进背景色，如浅灰色 #f6f7f8
                labelColor: {type:String, default:"gray"},      //标签颜色
                labelMarginRight: {type:Number, default:15},    //标签右边距，单位 px
            },
            RenderProps
        )
    )

    let { inited, formData, toSubmit, onExtraBtn, track } = RenderMixin(props, emits, " TREE")

    const toLowercase = v=> v.toLowerCase()
    //执行自定义脚本
    const onScript = (item, type='click')=>{
        if(props.debug==true)   track("组件被点击", item, type)

        if(item.scriptTrigger != type)      return
        if(!item.script)                    return

        props.renders.runScript && props.renders.runScript(item.script.trim())
    }
</script>

<style>
    @import '@grid-form/common/widgets/table.css';

    .grid-render-tree {
        .w-full {
            width: 100%;
        }
        .item {
            display: flex;
            align-items: center;
        }
        .rowIndex {
            cursor: pointer;
            text-align: right;
            color: v-bind(props.labelColor);
        }
        .sub-table {
            border-collapse: collapse;
            width: 100%;
            border-spacing: 0px;
            td {
                padding:0px;
            }
            .striped {
                background: #fafafa;
            }
        }
        .title {
            border-bottom: 1px solid #adadad;
            font-weight: 500;
            font-size: 18rpx;
            padding: 4px 0px 4px 0px;
        }
        .label {
            font-size: v-bind(props.fontSize);
            margin-right: v-bind(props.labelMarginRight+"px");
            color: v-bind(props.labelColor);
        }
        .input {
            font-size: v-bind(props.fontSize);
            flex-grow: 1;
            border: 0px;
            /* width: 180px; */
            border-bottom: 1px solid #adadad !important;
        }
        .empty {
            flex-grow: 1;
        }
        .input:focus {
            outline: none; /* 移除默认的蓝色轮廓线 */
            border-bottom: 1px solid #000 !important;
            background: #fafafa;
            /* border: 1px solid #adadad; */
            /* border-radius: 3px; */
        }
        .input:hover {
            background: #fafafa;
        }
        .mr-10 {
            margin-right: 10px;
        }
        .item_level {
            background-color: v-bind(props.indentColor);
            color: v-bind(props.indentColor);
            text-align: right;
            height: 100%;
        }
        .item_level_1 {
            width: v-bind(indent+'px');
        }
        .item_level_2 {
            margin-left: v-bind(2*indent+'px');
        }
        .item_level_3 {
            margin-left: v-bind(3*indent+'px');
        }
        .item_level_4 {
            margin-left: v-bind(4*indent+'px');
        }
    }
</style>
