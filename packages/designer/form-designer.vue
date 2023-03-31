<template>
    <div>
        <n-dialog-provider>
            <n-message-provider>
                <n-layout style="height: 100%">
                    <n-layout-header :style="{height: headerHeight+'px', padding: '10px'}" bordered>
                        <n-space justify="space-between">
                            <slot name="title">
                                <div style="font-size: 24px;">GRID-FORM 表单设计器 <template v-if="form.id">#{{form.id}}</template> </div>
                            </slot>

                            <n-space>
                                <n-dropdown trigger="click" :options="buildOptions('oneLine|单行JSON,pretty|格式化JSON', 'key')" :show-arrow="true" @select="toExport">
                                    <n-button type="primary" secondary><template #icon><n-icon :component="FileDownload" /></template> 导出表单</n-button>
                                </n-dropdown>

                                <n-button type="primary" @click="toSave" :loading="loading"><template #icon><n-icon :component="CheckCircle" /></template> 保存表单</n-button>
                            </n-space>
                        </n-space>
                    </n-layout-header>
                    <n-layout position="absolute" :style="{top: headerHeight + 'px', bottom: showFooter?(footerHeight + 'px'):'0px'}" has-sider>
                        <n-layout-sider collapse-mode="transform" :collapsed-width="collapsedWidth" :width="siderWidth" show-trigger="arrow-circle" content-style="padding: 12px;" :native-scrollbar="false" bordered>
                            <FormSetting :form="form" :compact="compact" />
                        </n-layout-sider>
                        <n-layout  has-sider sider-placement="right">
                            <n-layout :native-scrollbar="false" content-style="padding: 10px 20px 10px 20px;">
                                <n-form :label-width="form.labelWidth" :size="form.size" :label-placement="form.labelPlacement" :label-align="form.labelAlign" :show-label="form.labelShow">
                                    <n-grid :x-gap="gridGap" :y-gap="gridGap" :cols="form.grid" class="designer-content" :style="{width: form.width, margin:'0px auto' }">
                                        <n-form-item-gi v-for="(item, index) in form.items" :key="index" :span="item._col" :show-feedback="false" :show-label="item._text!=undefined" :label="item._text===false?'':item._text"
                                            @click.stop="toActice(item)" class="cell" :class="{active:item._active === true}">

                                            <n-popconfirm @positive-click="()=> form.items.splice(index, 1)">
                                                <template #trigger>
                                                    <n-button class="remove" secondary type="error" size="tiny" circle> <template #icon> <n-icon :component="Trash" /> </template> </n-button>
                                                </template>
                                                删除 <n-text code>{{item._uuid}}/{{item._text}}</n-text> 吗？
                                            </n-popconfirm>
                                            <!-- <n-button class="remove" secondary type="error" size="tiny" circle @click="toRemove(item, index)"> <template #icon> <n-icon :component="Trash" /> </template> </n-button> -->

                                            <component :is="buildComponent(item, renders[item._widget], debug? track: false)" />
                                        </n-form-item-gi>

                                        <!-- <n-form-item-gi :show-feedback="false" class="cell" label="文本输入框">
                                            <n-input />
                                        </n-form-item-gi> -->
                                        <n-gi class="cell flex" style="align-items: center; justify-content: center;">
                                            <Selector @select="onAddComponent" :components="components" />
                                        </n-gi>
                                    </n-grid>
                                    <div style="text-align: center; margin-top: 12px;">
                                        <n-space justify="center">
                                            <n-button v-if="form.submitText" size="large" type="primary" @click="toTestSubmit">{{form.submitText}}</n-button>
                                            <n-button v-for="btn in form.buttons" :type="btn.theme" size="large">{{btn.text}}</n-button>
                                        </n-space>
                                        <div v-if="form.submitText" style="margin-top: 6px;"> <n-text depth="3">点击按钮演示提交后回显文案</n-text> </div>
                                    </div>
                                </n-form>
                            </n-layout>

                            <n-layout-sider collapse-mode="transform" :collapsed-width="collapsedWidth" show-trigger="arrow-circle" content-style="padding: 12px;" :native-scrollbar="false" :width="siderWidth" bordered>
                                <AttributeEditor :bean="attrEditor.bean" :items="attrEditor.items" :compact="compact" />
                            </n-layout-sider>
                        </n-layout>
                    </n-layout>
                    <n-layout-footer v-if="showFooter" position="absolute" :style="{height: footerHeight+'px', padding: '10px'}" bordered>
                        <slot name="footer">
                            <div style="text-align:center">
                                😊 感谢使用 <n-button size="small" text tag="a" target="_blank" href="https://github.com/0604hx/grid-form">GRID-FORM</n-button> 表单设计器 😊
                            </div>
                        </slot>
                    </n-layout-footer>
                </n-layout>
            </n-message-provider>
        </n-dialog-provider>
    </div>
</template>

<script setup>
    import { ref, onMounted,onUnmounted, h, reactive, toRaw, unref } from 'vue'
    import { Bolt, Plus, Trash, CheckCircle, Download, FileDownload } from "@vicons/fa"
    import { useMessage, useDialog } from "naive-ui"

    import { createFormItem, buildOptions, buildComponent, withHtmlNode } from '@grid-form/common'

    import Selector from "./components/selector.vue"
    import AttributeEditor from "./form-attribute.vue"
    import FormSetting from "./form-setting.vue"

    const message = useMessage()
    const dialog = useDialog()

    const emits = defineEmits(['save'])
    const props = defineProps({
        siderWidth:{type:[Number, String], default: 360 },      //左右两个侧边栏的宽度，支持 px、% 单位，建议直接传递数值
        gridGap: {type:Number, default: 10},                    //栅栏间隔，单位 px
        loading: {type:Boolean},
        review: {type:Boolean, default: false},                 //是否做表单项检验
        renders:{type:Object},                                  //具体的组件渲染函数
        components:{type:Array, default:[]},                    //可选的组件
        form: {type:Object},
        compact:{type:Boolean, default: false},                 //紧凑的布局，如果设置为true，则左右两侧的属性编辑行距缩短
        headerHeight: { type:Number, default: 55 },
        debug: {type:Boolean, default: false},                  //开启debug 模式后，会在控制台输入各种信息
        showFooter: {type:Boolean, default: false},
        footerHeight: {type:Number, default: 50 }
    })

    const track = (...ps)=> console.debug("%c[DESIGNER]", "background:#8c0776;padding:3px;color:white", ...ps)

    const collapsedWidth = 10

    /**
     *
     */
    const getItemsByWidget = widget=>{
        for(let g of props.components){
            for(let son of g.items){
                if(son.id == widget)
                    return son.items
            }
        }
    }

    const attrEditor = reactive({ bean:{}, items:[] })

    const onAddComponent = row=> {
        let item = createFormItem(row)
        if(props.debug) {
            message.info(`添加组件：${row.label}`)
            track(`添加表单项 ${row.id} `, item)
        }
        props.form.items.push(item)
    }

    const toActice = item=> {
        if(props.debug) track(`组件被点击：`, item)
        if(item._active === true)   return

        let items = getItemsByWidget(item._widget)
        if(!!items){
            item._active = true
            if(!!attrEditor.bean)  attrEditor.bean._active = false

            attrEditor.bean = item
            attrEditor.items = items
        }
        else
            message.warning(`注册的组件中找不到⌈${item._widget}⌋，请联系管理员`)
    }

    // const toTestSubmit = ()=> alert(props.form.okText||`数据提交完成，感谢支持`)
    const toTestSubmit = ()=> dialog.create({
        type:"success",
        title: "数据提交成功",
        content: withHtmlNode(props.form.okText||`数据提交完成，感谢支持`)
    })

    const _toSimpleObject = ()=>{
        if(props.review){
            if(!/^[0-9]+%$|px$/.test(props.form.width))  return message.warning(`表单宽度填写不合法`)

            let items = props.form.items
            //判断字段合法性
            for (let i = 0; i < items.length; i++) {
                const item = items[i]

                if(("_uuid" in item && !item._uuid) || ("_text" in item && !item._text))
                    return message.warning(`第${i+1}个表单项的编号及中文名不能为空`)
            }
        }

        let form = unref(toRaw(props.form))
        if(form.items){
            form.items.forEach(v=> delete v._active)
        }
        // 父类组件按需将 items、buttons 两个数组转换为 JSON 格式的字符串
        // form.items = JSON.stringify(form.items || "[]")
        // form.buttons = JSON.stringify(form.buttons||"[]")
        return form
    }

    const toSave = ()=>emits("save", _toSimpleObject())

    const toExport = type=>{
        let json = JSON.stringify(_toSimpleObject(), null, type=='pretty'? 4 : undefined)
        if(props.debug) track("表单导出", type, json)
        navigator.clipboard.writeText(json)
        message.success(`表单数据已复制到粘贴板`)
    }

    onMounted(()=> message.info(`欢迎使用 GRID-FROM 设计器`))
</script>


<style>
    .designer-content .cell {
        min-height: 50px;
        padding: 8px;
        background: rgba(200, 200, 200, 0.1);
    }

    .designer-content .flex {
        display: flex;
    }

    .designer-content .cell:hover {
        background: rgba(200, 200, 200, 0.15);
    }

    .designer-content .cell.active .remove {
        display: inline-flex;
    }

    .designer-content .cell .remove {
        display: none;
        position: absolute;
        top: -5px;
        right: -3px;
        z-index: 99;
    }

    .designer-content .cell .n-form-item--top-labelled .remove {
        top: -30px !important;
    }

    .designer-content .cell .n-form-item--no-label .remove {
        top: -5px !important;
    }
</style>
