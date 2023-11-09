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
                                        <n-form-item-gi v-for="(item, index) in form.items" :key="index" :span="item._col" :show-feedback="false"
                                            @click.stop="toActice(item)" class="cell" :class="{active:item._active === true}"  @contextmenu="e=>contextMenu && menu.show(e, index)">
                                            <template #label>
                                                {{item._text}}<span v-if="item._required" style="color: red;font-weight: 600;">*</span>
                                            </template>

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

        <!--右键菜单-->
        <!-- <n-dropdown v-if="contextMenu" placement="bottom-start" trigger="manual" :x="menu.x" :y="menu.y" :options="menuOptions" :show="menu.show"
            :on-clickoutside="()=>menu.show=false" @select="onMenuSelect" /> -->
        <ContextMenu v-if="contextMenu" :components="components" ref="menu" @select="onMenuSelect" />
    </div>
</template>

<script setup>
    import { ref, onMounted,onUnmounted, h, reactive, toRaw, unref } from 'vue'
    import { Bolt, Plus, Trash, CheckCircle, Download, FileDownload, Copy, HandPointLeftRegular,HandPointRightRegular } from "@vicons/fa"
    import { useMessage, useDialog } from "naive-ui"

    import { createFormItem, buildOptions, buildComponent, withHtmlNode } from '@grid-form/common'

    import Selector from "./components/selector.vue"
    import AttributeEditor from "./form-attribute.vue"
    import FormSetting from "./form-setting.vue"
    import ContextMenu from "./components/context-menu.vue"

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
        footerHeight: {type:Number, default: 50 },
        contextMenu: {type:Boolean, default: false},            //开启右键菜单
        enableCtrlS: {type:Boolean, default: false},            //是否开启 CTRL+S 保存快捷键
    })

    const track = (...ps)=> console.debug("%c[DESIGNER]", "background:#8c0776;padding:3px;color:white", ...ps)

    const collapsedWidth = 10

    let menu = ref()
    let copied = ""
    const showMenu = (e, index)=>  menu.value.show(e, index)
    const onMenuSelect = (key, index, com)=>{
        console.debug(key, index, com)
        if(key == 'copy'){
            copied = JSON.stringify(props.form.items[index])
            navigator.clipboard.writeText(copied)
            message.success(`表单项已复制到粘贴板`)
        }
        else if(key == 'paste'){
            if(!!copied){
                let item = JSON.parse(copied)
                delete item._active
                doAddComponent(item, index-1)
            }
            else
                message.warning(`请先复制再进行粘贴`)
        }
        else if(key == 'delete'){
            let item = props.form.items[index]
            console.debug(item)
            item && dialog.warning({
                title:`删除组件`,
                content: `确定删除表单项⌈${item._text}⌋吗？`,
                positiveText: "确定",
                negativeText: "我再想想",
                onPositiveClick: () => {
                    props.form.items.splice(index, 1)
                }
            })
        }
        else {
            doAddComponent(createFormItem(com), index)
        }
    }

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

    const onAddComponent = row=> doAddComponent(createFormItem(row))

    const doAddComponent = (item, position=-1)=> {
        if(props.debug) {
            message.info(`添加组件：${item._text}`)
            track(`添加表单项 ${item._widget} `, item)
        }

        if(position<=-1)
            props.form.items.push(item)
        else
            props.form.items.splice(position, 0, item)
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

    const _error = msg =>{
        message.warning(msg)
        throw Error(msg)
    }

    const _toSimpleObject = ()=>{
        if(props.review){
            if(!/^[0-9]+%$|px$/.test(props.form.width))  _error(`表单宽度填写不合法`)

            let idMap = {}
            let items = props.form.items
            //判断字段合法性
            for (let i = 0; i < items.length; i++) {
                const item = items[i]

                if(("_uuid" in item && !item._uuid) || ("_text" in item && !item._text))
                    _error(`第${i+1}个表单项的编号及中文名不能为空`)

                idMap[item._uuid] = (idMap[item._uuid] || 0) + 1
            }

            let repeatId = Object.keys(idMap).filter(v=>idMap[v]>1).join("、")
            if(!!repeatId)  _error(`存在重复表单项ID ⌈ ${repeatId} ⌋`)
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

    const toSave = ()=>  emits("save", _toSimpleObject())

    const toExport = type=>{
        let json = JSON.stringify(_toSimpleObject(), null, type=='pretty'? 4 : undefined)
        if(props.debug) track("表单导出", type, json)
        navigator.clipboard.writeText(json)
        message.success(`表单数据已复制到粘贴板`)
    }

    if(props.enableCtrlS){
        props.debug && track("绑定 CTRL+S 保存快捷键")
        document.onkeydown = e => {
            let {ctrlKey, key} = e
            if(ctrlKey==true && key=='s'){
                e.preventDefault()
                toSave()
            }
        }
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
