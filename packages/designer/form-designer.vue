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

                            <n-space size="small">
                                <!-- <n-button type="primary" secondary @click="toPreview"><template #icon><n-icon :component="Eye" /></template> 预览</n-button> -->
                                <n-dropdown trigger="click" :options="cogOptions" :show-arrow="true" @select="onFuncSelect">
                                    <n-button type="primary" secondary><template #icon><n-icon :component="Cog" /></template></n-button>
                                </n-dropdown>

                                <n-button type="primary" @click="toSave" :loading="loading"><template #icon><n-icon :component="CheckCircle" /></template> 保存表单</n-button>
                            </n-space>
                        </n-space>
                    </n-layout-header>

                    <n-layout position="absolute" :style="{top: headerHeight + 'px', bottom: showFooter?(footerHeight + 'px'):'0px'}" has-sider>
                        <!--左侧表单配置面板-->
                        <n-layout-sider collapse-mode="transform" :collapsed-width="collapsedWidth" :width="siderWidth" show-trigger="arrow-circle" content-style="padding: 12px;" :native-scrollbar="false" bordered>
                            <FormSetting :form="form" :compact="compact" />
                        </n-layout-sider>

                        <!--设计器主体-->
                        <n-layout  has-sider sider-placement="right">
                            <n-layout :native-scrollbar="false" content-style="padding: 10px 20px 10px 20px;">
                                <n-form :label-width="form.labelWidth" :size="form.size" :label-placement="form.labelPlacement" :label-align="form.labelAlign">
                                    <Container :form="form" :gridGap="gridGap" :contextMenu="menu" :bindClick="toActice"
                                        :renders="renders" :components="components" top
                                        :track="debug?track:null" />

                                    <div style="text-align: center; margin-top: 12px;">
                                        <n-space justify="center">
                                            <n-button v-if="form.submitText" size="large" type="primary" @click="toTestSubmit">{{form.submitText}}</n-button>
                                            <n-button v-for="btn in form.buttons" :type="btn.theme" size="large">{{btn.text}}</n-button>
                                        </n-space>
                                        <div v-if="form.submitText" style="margin-top: 6px;"> <n-text depth="3">点击按钮演示提交后回显文案</n-text> </div>
                                    </div>
                                </n-form>
                            </n-layout>

                            <!--右侧组件属性面板-->
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
        <ContextMenu v-if="contextMenu" :components="components" ref="menu" @select="onMenuSelect" />

        <n-modal v-model:show="importForm.show" preset="card" :style="{width: '1000px'}" :mask-closable="false" title="导入表单">
            <CodeEditor v-model:value="importForm.code" height="calc(100vh - 180px)" style="margin-top: 8px;"/>
            <n-space style="margin-top: 10px;" justify="center">
                <n-button type="primary" @click="toImport">更新 JSON 数据到设计器</n-button>
            </n-space>
        </n-modal>
    </div>
</template>

<script setup>
    import { ref, onMounted,onUnmounted, h, reactive, toRaw, unref, nextTick } from 'vue'
    import { Bolt, Plus, CheckCircle, Download, FileDownload, Copy, HandPointLeftRegular,HandPointRightRegular, Eye, Cog, Code, Upload } from "@vicons/fa"
    import { useMessage, useDialog, NIcon, NMessageProvider, NDialogProvider, NLayout, NDropdown, NButton, NLayoutHeader, NLayoutFooter, NLayoutSider, NSpace, NForm, NText, NModal } from "naive-ui"

    import { createFormItem, buildOptions, buildComponent, withHtmlNode, copyText, triggerLoaded, extendFormItems } from '@grid-form/common'

    import Selector from "./components/selector.vue"
    import AttributeEditor from "./form-attribute.vue"
    import FormSetting from "./form-setting.vue"
    import ContextMenu from "./components/context-menu.vue"
    import Container from "./container.vue"
    import CodeEditor from "./components/editor.code.vue"

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

    const track = (...ps)=> console.debug("%c[GRID-FORM DESIGNER]", "background:#8c0776;padding:3px;color:white", ...ps)

    const collapsedWidth = 10
    const cogOptions = [
        { label:"编辑JSON数据", key:"edit", icon:()=> h(NIcon, null, ()=> h(Code)) },
        { label:"导入JSON表单", key:"import", icon:()=> h(NIcon, null, ()=> h(Upload)) },
        { type:"divider"},
        { label:"导出（单行JSON）", key:"oneLine", icon:()=> h(NIcon, null, ()=> h(Download)) },
        { label:"导出（格式化JSON）", key:"pretty", icon:()=> h(NIcon, null, ()=> h(Download)) }
    ]

    const importForm = reactive({show: false, code:""})
    let menu = ref()
    const attrEditor = reactive({ bean:{}, items:[] })

    let copied = ""
    const onMenuSelect = (key, index, com, container)=>{
        if(key == 'copy'){
            copied = container.copy(index)
            copyText(copied)
            message.success(`表单项已复制到粘贴板`)
        }
        else if(key == 'paste'){
            if(!!copied){
                let item = JSON.parse(copied)
                delete item._active
                container.add(item, index)
            }
            else
                message.warning(`请先复制再进行粘贴`)
        }
        else if(key == 'delete'){
            container.remove(index)
        }
        else {
            container.add(createFormItem(com), index)
        }
    }

    const getItemsByWidget = widget=>{
        for(let g of props.components){
            for(let son of g.items){
                if(son.id == widget)
                    return son.items
            }
        }
    }

    const toActice = item=> {
        if(item._active === true)   return

        let items = getItemsByWidget(item._widget)
        if(!!items){
            if(props.debug) track(`组件被点击：`, item)

            item._active = true
            if(!!attrEditor.bean)  attrEditor.bean._active = false

            attrEditor.bean = item
            attrEditor.items = items
        }
        else
            message.warning(`注册的组件中找不到⌈${item._widget}⌋，请联系管理员`)
    }

    const toTestSubmit = ()=> dialog.create({
        type:"success",
        title: "数据提交成功",
        content: withHtmlNode(props.form.okText||`数据提交完成，感谢支持`)
    })

    const _error = msg =>{
        message.warning(msg)
        throw Error(msg)
    }

    const _delProperty = (b, field="_active")=>{
        if(b.items){
            b.items.forEach(v=> {
                delete v[field]
                if(v._container===true && v.items)
                    _delProperty(v, field)
            })
        }
    }

    const _toSimpleObject = ()=>{
        if(props.review){
            if(!/^[0-9]+%$|px$/.test(props.form.width))  _error(`表单宽度填写不合法`)

            let items = props.form.items

            let idMap = {}
            let count = 0
            /**
             * 判断字段合法性
             * @param {Array} targets - 表单项数组
             */
            const _check = (targets, title="", prefix="")=>{
                for (let i = 0; i < targets.length; i++) {
                    const item = targets[i]

                    if("_uuid" in item){
                        count ++
                        if(!item._uuid || ("_text" in item && !item._text))
                            _error(`${title}第${count}个表单项的编号及中文名不能为空`)

                        if(item._uuid){
                            let key = prefix? `${prefix}/${item._uuid}`: item._uuid
                            idMap[key] = (idMap[key] || 0) + 1
                        }
                    }

                    if(Array.isArray(item.items)){
                        _check(item.items, `子表单⌈${item.title}⌋`, prefix+(!!item._uuid?`/${item._uuid}` : ""))
                    }
                }
            }
            _check(items)

            if(props.debug) track(`表单项ID合集：`, idMap)
            let repeatId = Object.keys(idMap).filter(v=>idMap[v]>1).join("、")
            if(!!repeatId)  _error(`存在重复表单项ID ⌈ ${repeatId} ⌋`)
        }

        let form = unref(toRaw(props.form))
        _delProperty(form)

        // 父类组件按需将 items、buttons 两个数组转换为 JSON 格式的字符串
        // form.items = JSON.stringify(form.items || "[]")
        // form.buttons = JSON.stringify(form.buttons||"[]")
        return form
    }

    const onFuncSelect = key=>{
        if(key === 'edit'){
            importForm.code = JSON.stringify(_toSimpleObject(), null, 4)
            importForm.show = true
        }
        else if(key === 'import'){
            importForm.code = ""
            importForm.show = true
        }
        else{
            let json = JSON.stringify(_toSimpleObject(), null, type=='pretty'? 4 : undefined)
            if(props.debug) track("表单导出", type, json)
            copyText(json)
            message.success(`表单数据已复制到粘贴板`)
        }
    }

    const toImport = ()=>{
        if(!importForm.code.trim()) return message.warning(`请填写JSON数据`)
        try{
            let bean = JSON.parse(importForm.code)
            Object.assign(props.form, bean)
            nextTick(()=>{
                attrEditor.bean = {}
                importForm.show = false
                importForm.code = ""
            })
        }
        catch(e){
            _error("解析JSON出错："+e.message)
        }
    }

    const toSave = ()=>  emits("save", _toSimpleObject())

    // const toPreview = ()=> {
    //     track("预览表单")
    //     message.warning(`此功能开发中，敬请期待...`)
    // }

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

    if(props.renders){
        props.renders.runScript = (code, formItem)=>{
            if(props.debug) track(`脚本被触发`, code, unref(toRaw(formItem)))
            triggerLoaded(code, {}, props.form.items)
        }
    }

    // 扩展表单项数组对象，便于在交互脚本中与渲染器保持一致
    extendFormItems(props.form.items)

    onMounted(()=> {
        let welcome = `欢迎使用 GRID-FROM 设计器`
        console.group(welcome)
        console.log("这是一个%c开源项目", "color:#8c0776;font-weight:bold", "https://github.com/0604hx/grid-form")
        console.log("如果对您有所帮助，请不吝点个Star 😄")
        console.groupEnd()
        message.info(welcome)
    })
</script>

<style>
    .w-full {
        width: 100%;
    }
    .designer-content .cell {
        min-height: 50px;
        padding: 8px;
        background: rgba(200, 200, 200, 0.1);
    }
    .designer-content .cell.top {
        background: rgba(200, 200, 200, 0.15);
    }

    .designer-content .flex {
        display: flex;
    }

    .designer-content .cell:hover {
        background: rgba(200, 200, 200, 0.15);
    }

    /* 暂不知道如何设置只对第一个 .remove 生效，有方案的大神请不吝赐教😄 */
    .designer-content .cell.active .remove:nth-of-type(1) {
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
