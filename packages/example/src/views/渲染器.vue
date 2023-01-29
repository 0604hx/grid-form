<template>
    <div style="padding: 20px; margin:0px auto; width:80%;">
        <n-card title="表单渲染示例" :segmented="{content: true}">
            <FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
        </n-card>

        <n-divider title-placement="center">表单反馈输出</n-divider>
        <div v-if="result.title">
            <n-tag :type="result.type">{{result.title}}</n-tag>

            {{result.data}}
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref,watch } from 'vue'
    import { NInput } from 'naive-ui'

    import { FormRender, RenderFuncs } from "@grid-form/render-naive"

    const COLS = 4

    // 如需扩展 Widgets,Components ，请自行扩写
    let form = reactive({
        "size":"medium",
        "width":"100%",
        "grid":3,
        "labelWidth":120,
        "labelShow":true,
        "labelPlacement":"top",
        "labelAlign":"left",
        "submitText":"提交数据",
        "url":"",
        "okText":"",
        "onLoad":"console.debug(`表单初始化完成`, form); form.scale= form.scale||1",
        "onSubmit":"",
        "items":[
            {"_widget":"INPUT","_uuid":"name","_text":"企业名称","_col":1,"_required":true,"_regex":"","_message":"","placeholder":"请输入","clearable":true,"show-count":true,"rows":1,"_value":"","_active":true,"minlength":4},
            {"_widget":"NUMBER","_uuid":"scale","_text":"企业规模","_col":1,"_required":true,"_regex":"","_message":"","placeholder":"请输入","clearable":true,"_active":false,"suffix":"人","min":1},
            {"_widget":"INPUT","_uuid":"address","_text":"办公地址","_col":1,"_required":false,"_regex":"","_message":"","placeholder":"请输入","clearable":true,"show-count":false,"rows":1,"_value":"","_active":false},
            {"_widget":"TAGS","_uuid":"tags","_text":"企业标签","_col":3,"_required":false,"_regex":"","_message":"","closable":true,"round":false,"_active":false}
        ],
        "buttons":[
            {"text":"自定义按钮", theme:"info", type:"download", code:`console.debug("自定义按钮被点击了，即将触发 ACTION=DOWNLOAD 类型的表单提交")`},
            /*
            code 支持全局函数的调用
            */
            {"text":"随机企业名称", theme:"default", type:"script", code:`form.name=randomName()`}
        ]
    })
    let result = reactive({title:"", type:"", data:{}})

    const onInited = ()=> Object.assign(result, {title:"初始化完成", type:"info", data:"表单渲染完成，可以输入或者点击按钮了" })

    const onSubmit = (formObj, action)=> Object.assign(result, {title:"表单数据", type:"success", data:{"表单数据": formObj, "提交类型": action} })

    const onFailed = data=>  Object.assign(result, {title:"校验失败", type:"error", data })

    window.randomName = window.randomName || (()=> `广西南宁市星期${"一二三四五六天"[Math.floor(Math.random()*7)]}有限公司`)
</script>
