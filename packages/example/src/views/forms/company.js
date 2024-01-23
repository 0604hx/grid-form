/**
     * 数据变动参数
     *      form    表单数据对象
     *      agent
     *      items   表单项列表，可以修改值以改变表单
     */
let onChange = `
if(agent.key=='nature'){
    if(agent.to=='个体工商户'){
        items.$("scale").disabled=true
        form.scale = 1
        alert(agent.to+"无需填写规模")
    }
    else{
        items.$("scale").disabled=false
    }
}
`

let onLoad = `
console.debug('表单初始化完成', form, items)
form.scale= form.scale||1
setTimeout(()=>{
    console.debug('更新下拉框选项...')
    items.$('nature').options = '国有企业, 集体企业, 私营企业, 个体工商户, 合伙企业, 联营企业, 股份合作制企业, 有限责任公司, 股份有限公司'
}, 1000)
`

export default {
    "size":"medium",
    "width":"100%",
    "grid":3,
    "labelWidth":90,
    "labelShow":true,
    "labelPlacement":"left",
    "labelAlign":"left",
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
        {"_widget":"ALERT","_col":3, "title": "操作说明", "content": "请按照要求填写数据，并点击提交按钮", "_html": true,"type": "info", "_hideLabel": true},
        {
            "_widget": "CARD","size": "medium","width": "100%", "grid": 3, "labelWidth": "120px",  "labelShow": true, "labelPlacement": "top", "labelAlign": "left",
            "_col": 3, "title": "基本信息", "bordered": true, "_container": true, "_hideLabel": true,
            items:[
                {"_widget":"INPUT","_uuid":"name","_text":"企业名称","_col":1,"_required":true,"_regex":"","_message":"","placeholder":"请输入","clearable":true,"show-count":true,"rows":1,"_value":"有限公司","minlength":4, "prefix":"广西"},
                {"_widget":"NUMBER","_uuid":"scale","_text":"企业规模","_col":1,"_required":true,"_regex":"","_message":"","placeholder":"请输入","clearable":false,"suffix":"人","min":1},
                {"_widget":"SELECT","_uuid":"nature","_text":"企业性质","_col":1,"_watch":true,"_required":false,"_value":"国有企业","options":""},
            ]
        },
        {
            "_widget": "CARD","size": "medium","width": "100%", "grid": 3, "labelWidth": "120px",  "labelShow": true, "labelPlacement": "top", "labelAlign": "left",
            "_col": 3, "title": "企业文化理论/传承", "bordered": true, "_container": true, "_hideLabel": true,
            items:[
                {"_widget":"SELECT","_uuid":"feature","_text":"企业特点","_col":1,"_watch":true,"_required":false,"_value":"社会责任,企业文化",  multiple:true,"options":"大型企业,社会责任,上市公司,经营理念,企业文化,产品特性,技术壁垒,本土企业,房地产,明星企业,纳税大户,良心经营"},
                {"_widget":"INPUT","_uuid":"address","_text":"办公地址","_col":1,"_required":false,"_regex":"","_message":"","_value":"${date}","placeholder":"请输入","clearable":false,"show-count":false,"rows":1},
                {"_widget":"FILE","_uuid":"yyzz","_text":"营业执照影像","_col":1,"maxSize":2,"accept":"image/png,image/jpeg","dataType":""},//可选的 dataType 有：base64,text
            ]
        },
        {"_widget":"TAGS","_uuid":"tags","_text":"企业标签","_col":3,"_required":false,"_regex":"","_message":"","closable": true,"round":true, "max":3},
        {"_widget":"INPUT","_uuid":"summary","_text":"备注信息","_col":3}

    ],
    "buttons":[
        {"text":"自定义按钮", theme:"info", type:"download", code:`console.debug("自定义按钮被点击了，即将触发 ACTION=DOWNLOAD 类型的表单提交")`},
        /*
        code 支持全局函数的调用
        */
        {"text":"随机企业名称", theme:"default", type:"script", code:`form.name=randomName()`}
    ]
}
