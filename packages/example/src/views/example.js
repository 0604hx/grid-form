import { reactive, onMounted, onUnmounted } from 'vue'

import dayjs from 'dayjs'
import { formValueProvider } from "@grid-form/common"

export function RenderDemo(){
    /*
    扩展默认的表单默认值计算器
    支持 Promise （未作异常捕获，慎用）

    注意，占位符默认是 ${xxx} 的格式（前后不能有其他字符）
    */
    formValueProvider["${date}"]        = ()=> {
        console.debug("[扩展表单值计算] 获取当前日期（使用 dayjs 库）")
        return dayjs(new Date()).format("YYYY-MM-DD")
    }
    formValueProvider["${username}"]    = ()=> "集成显卡"

    /**
     * 数据变动参数
     *      form    表单数据对象
     *      agent
     *      items   表单项列表，可以修改值以改变表单
     */
    let onChange = `
    if(agent.key=='nature'){
        if(agent.to=='个体工商户'){
            items.filter(v=>v._uuid=='scale')[0].disabled=true
            form.scale = 1
            alert(agent.to+"无需填写规模")
        }
        else{
            items.filter(v=>v._uuid=='scale')[0].disabled=false
        }
    }
    `

    let onLoad = `
    console.debug('表单初始化完成', form, items)
    form.scale= form.scale||1
    setTimeout(()=>{
        console.debug('更新下拉框选项')
        items.find(v=>v._uuid=='nature').options = '国有企业, 集体企业, 私营企业, 个体工商户, 合伙企业, 联营企业, 股份合作制企业, 有限责任公司, 股份有限公司'
    }, 1000)
    `

    // 如需扩展 Widgets,Components ，请自行扩写
    let form = reactive({
        "size":"medium",
        "width":"100%",
        "grid":3,
        "labelWidth":90,
        "labelShow":true,
        "labelPlacement":"top",
        "labelAlign":"top",
        "submitText":"提交数据",
        "url":"",
        "okText":"",
        onLoad,
        onChange,
        "onSubmit":"",
        "hides":[
            { id:"username", value:"${username}" }
        ],
        "items":[
            {"_widget":"ALERT","_col":3, "title": "操作说明", "content": "请按照要求填写数据，并点击提交按钮", "_html": true,"type": "info",},
            {"_widget":"INPUT","_uuid":"name","_text":"企业名称","_col":1,"_required":true,"_regex":"","_message":"","placeholder":"请输入","clearable":true,"show-count":true,"rows":1,"_value":"有限公司","minlength":4},
            {"_widget":"NUMBER","_uuid":"scale","_text":"企业规模","_col":1,"_required":true,"_regex":"","_message":"","placeholder":"请输入","clearable":false,"suffix":"人","min":1},
            {"_widget":"SELECT","_uuid":"nature","_text":"企业性质","_col":1,"_watch":true,"_required":false,"_value":"国有企业","options":""},
            {"_widget":"SELECT","_uuid":"feature","_text":"企业特点","_col":1,"_watch":true,"_required":false,"_value":"社会责任,企业文化",  multiple:true,"options":"大型企业,社会责任,上市公司,经营理念,企业文化,产品特性,技术壁垒,本土企业,房地产,明星企业,纳税大户,良心经营"},
            {"_widget":"INPUT","_uuid":"address","_text":"办公地址","_col":1,"_required":false,"_regex":"","_message":"","_value":"${date}","placeholder":"请输入","clearable":false,"show-count":false,"rows":1},
            {"_widget":"FILE","_uuid":"yyzz","_text":"营业执照影像","_col":1,"maxSize":2,"accept":"image/png,image/jpeg","dataType":""},//可选的 dataType 有：base64,text
            {"_widget":"TAGS","_uuid":"tags","_text":"企业标签","_col":3,"_required":false,"_regex":"","_message":"","closable": true,"round":false}
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

    const onSubmit = (formObj, action)=> {
        Object.assign(result, {title:"表单数据", type:"success", data:{"表单数据": formObj, "提交类型": action} })
        console.debug("提交的表单项目", formObj)
    }

    const onFailed = data=>  Object.assign(result, {title:"校验失败", type:"error", data })

    onMounted(()=> window.randomName = ()=> `广西南宁市星期${"一二三四五六天"[Math.floor(Math.random()*7)]}有限公司` )
    onUnmounted(()=> delete window.randomName)

    return { form, onInited, onFailed, onSubmit, result }
}
