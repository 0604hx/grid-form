<template>
    <div v-if="inited" class="grid-render-tree">
        <Container :form="form" :formData="formData" :showIcon />

        <div style="margin-top:10px;"><button type="submit" @click="toSubmit">{{form.submitText}}</button></div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    import { buildComponent, buildOptions } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Icon from "./icon.vue"

    import Input from "./widgets/input.vue"
    import Select from "./widgets/select.vue"
    import Checkbox from "./widgets/checkbox.vue"
    import Radio from "./widgets/radio.vue"

    import Container from "./container.vue"

    const emits = defineEmits(RenderEvent)
    const props = defineProps(
        Object.assign(
            {
                fontSize: {type:String, default:"14rpx"},
                showIcon: {type:Boolean, default: true},        //是否显示图标
                indent: {type:Number, default: 30},             //层级缩进，单位 px
                indentColor:{type:String, default:"#f6f7f8"},   //层级缩进背景色
                labelColor: {type:String, default:"gray"},      //标签颜色
                labelMarginRight: {type:Number, default:15},    //标签右边距，单位 px
            },
            RenderProps
        )
    )

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " TREE")

    const inputs = ["INPUT", "NUMBER", "DATE"]
    const unavailables = ["BUTTON","IMAGE", "ALERT", "DIVIDER", "RATE"]

    const canRender = widget => !["BUTTON","IMAGE", "ALERT", "DIVIDER"].includes(widget)
    const toLowercase = v=> v.toLowerCase()

    onMounted(() => {
        console.debug("树形渲染器", props)
    })
</script>

<style>
    .grid-render-tree {
        .item {
            display: flex;
            align-items: center;
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
