<template>
    <n-form :show-feedback="false" :label-width="100" label-placement="left">
        <n-collapse :default-expanded-names="['basic','hook']">
            <n-collapse-item title="表单基础设置" name="basic">
                <n-space vertical :size="compact?'small':'medium'">
                    <n-form-item label-placement="left">
                        <template #label>
                            <n-tooltip trigger="hover">
                                <template #trigger><span style="cursor: help;">表单宽度</span></template>
                                默认100%（支持 %、px）
                            </n-tooltip>
                        </template>
                        <n-input v-model:value="form.width" />
                    </n-form-item>
                    <n-form-item label="整体尺寸">
                        <n-radio-group v-model:value="form.size">
                            <n-radio-button value="small">小号</n-radio-button>
                            <n-radio-button value="medium">标准</n-radio-button>
                            <n-radio-button value="large">大号</n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item>
                        <template #label>
                            <n-tooltip trigger="hover">
                                <template #trigger><span style="cursor: help;">表单列数</span></template>
                                默认 3 列（最大 24 列，但不推荐）
                            </n-tooltip>
                        </template>
                        <n-input-number class="w-full" v-model:value="form.grid" min="1" max="24"> <template #suffix>列</template> </n-input-number>
                    </n-form-item>
                    <n-form-item label="是否显示标签">
                        <n-switch v-model:value="form.labelShow" />
                    </n-form-item>
                    <n-form-item label="标签显示位置">
                        <n-radio-group v-model:value="form.labelPlacement" :disabled="!form.labelShow">
                            <n-radio-button value="top">在顶部</n-radio-button>
                            <n-radio-button value="left">在左边</n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item label="标签对齐方式">
                        <n-radio-group v-model:value="form.labelAlign" :disabled="!form.labelShow">
                            <n-radio-button value="left">左对齐</n-radio-button>
                            <n-radio-button value="right">右对齐</n-radio-button>
                        </n-radio-group>
                    </n-form-item>

                    <n-form-item>
                        <template #label>
                            <n-tooltip trigger="hover">
                                <template #trigger><span style="cursor: help;">标签宽度</span></template>
                                默认 120 px
                            </n-tooltip>
                        </template>
                        <n-input-number class="w-full" v-model:value="form.labelWidth" min="0" max="300"> <template #suffix>px</template> </n-input-number>
                    </n-form-item>
                    <n-form-item label="后台服务地址">  <n-input v-model:value="form.url" placeholder="留空则使用默认地址" /> </n-form-item>
                    <n-form-item label="提交按钮文本">  <n-input v-model:value="form.submitText" placeholder="留空则不显示该按钮" /> </n-form-item>
                    <n-form-item label="回显文案">  <n-input v-model:value="form.okText" placeholder="数据提交完成，感谢支持" /> </n-form-item>
                </n-space>
            </n-collapse-item>

            <n-collapse-item title="回调函数（HOOK）" name="hook">
                <n-list hoverable clickable :show-divider="false">
                    <n-list-item v-for="item in lifeCycles" @click="toHook(item)" style="padding: 6px 12px;">
                        <n-space justify="space-between">
                            <n-tag :bordered="false" :type="form[item.name]?'success':'default'" size="small">
                                {{item.name}}
                            </n-tag>
                            {{item.text}}
                        </n-space>
                    </n-list-item>
                </n-list>
            </n-collapse-item>

            <n-collapse-item title="扩展按钮" name="button">
                <template #header-extra>
                    <n-button size="small" type="primary" secondary @click="addBtn">添加按钮</n-button>
                </template>
                <n-table :bordered="false" :single-line="true" size="small">
                    <thead>
                        <tr>
                            <th>按钮文本</th>
                            <th>主题</th>
                            <th>类型</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.buttons">
                            <td><n-input size="small" v-model:value="item.text" /></td>
                            <td>
                                <n-popselect v-model:value="item.theme" :options="themeOptions" trigger="click">
                                    <n-button size="small" :type="item.theme">配色</n-button>
                                </n-popselect>
                            </td>
                            <td>
                                <n-popselect v-model:value="item.type" :options="typeOptions" trigger="click">
                                    <n-button size="small">{{typeTexts[item.type]}}</n-button>
                                </n-popselect>
                            </td>
                            <td>
                                <n-dropdown size="small" placement="right" :options="menuOptions" trigger="click" :show-arrow="true" @select="v=>onSelect(v, index)">
                                    <n-button size="small" :type="item.code?'primary':'default'" title="填写按钮点击后的处理脚本" quaternary> <template #icon> <n-icon :component="Cog" /> </template></n-button>
                                </n-dropdown>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
            </n-collapse-item>
        </n-collapse>
    </n-form>

    <n-modal v-model:show="hooker.show" preset="card" :style="{width: '1000px'}" :mask-closable="false">
        <template #header>
            <Bolt class="icon" />
            <n-tag v-if="hooker.func.promise" type="info" class="ml-3" :bordered="false">PROMISE</n-tag>
            {{hooker.func.text}}
        </template>

        <n-alert :title="hooker.func.summary" type="info" class="mb-2" :bordered="false"/>
        <CodeEditor v-model:value="form[hooker.func.name]" height="360px"/>
    </n-modal>

    <n-modal v-model:show="btner.show" preset="card" :style="{width: '1000px'}" :title="'⌈'+btner.item.text+'⌋的脚本'" :mask-closable="false">
        <template #header>
            <Bolt class="icon" />
            ⌈{{btner.item.text}}⌋的脚本
        </template>

        <n-alert type="info" class="mb-2" :bordered="false" >
            <n-text code type="success">按钮</n-text> 被点击后先调用用户<n-text code type="info">自定义脚本</n-text>（参数为 <n-text code type="primary">form</n-text>），若脚本返回 <n-text code type="error">false</n-text> 则中断后续流程，否则将按预设类型进行相应操作。

            <n-table size="small" class="mt-2" :bordered="false">
                <thead>
                    <tr><th>类型</th><th>流程</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><n-tag size="small" type="primary">提交</n-tag></td>
                        <td>将数据以 POST 形式提交到后台，并接受 JSON 返回值</td>
                    </tr>
                    <tr>
                        <td><n-tag size="small" type="primary">按钮</n-tag></td>
                        <td>将数据以 POST 形式提交到后台，并接受返回的文件流另存为本地文件</td>
                    </tr>
                    <tr>
                        <td><n-tag size="small" type="primary">脚本</n-tag></td>
                        <td>仅执行 JavaScript 脚本（可修改表单数据项）</td>
                    </tr>
                </tbody>
            </n-table>
        </n-alert>

        <CodeEditor v-model:value="btner.item.code" height="360px"/>
    </n-modal>
</template>

<script setup>
    import { ref,reactive, createVNode } from 'vue'
    import { NIcon } from 'naive-ui'
    import { Bolt, Plus, Edit, Cog, Code, Trash } from "@vicons/fa"

    import CodeEditor from "./components/editor.code.vue"

    import { buildOptions, lifeCycles } from '@grid-form/common'

    const props = defineProps({
        form: {type:Object},
        compact: {type:Boolean, default:false }
    })

    const buildIcon= (icon, ps={})=> ()=> createVNode(NIcon, Object.assign({component: icon}, ps))

    const themeOptions = buildOptions(["default|普通", "primary|主配色", "info|蓝色", "warning|橙色", "error|红色"])
    const typeTexts = {post:"提交", download:"下载", script:"脚本"}
    const typeOptions = buildOptions(typeTexts)
    const menuOptions = [
        {
            label: "编辑脚本",
            key: "code",
            icon: buildIcon(Code)
        },
        {
            label: "删除",
            key: "remove",
            icon: buildIcon(Trash, {class:"error"})
        }
    ]

    /**
     * 回调函数编辑器相关
     */
    const hooker = reactive({show: false, func:{}})
    const btner  = reactive({show: false, item:{}})

    const toHook = item => {
        hooker.func = item
        hooker.show = true
    }

    const addBtn = e=>{
        e.stopPropagation()
        props.form.buttons.push({text:"按钮", theme:"default", type:"post", code:""})
    }

    const editBtnScript = v=> {
        btner.item = v
        btner.show = true
    }

    const onSelect = (v, index)=>{
        if(v=='remove'){
            props.form.buttons.splice(index, 1)
        }
        else if(v=='code'){
            editBtnScript(props.form.buttons[index])
        }
    }
</script>
