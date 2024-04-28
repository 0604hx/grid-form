// const items =[
//     {"_widget":"DIVIDER", "_col":1, "dashed":true, "title-placement":"center", "_value":"我是分割线"},
//     {"_widget":"TEXT","_col":1, _value:"这个是<b style='color:blue'>文本显示</b>", _html:true },
//     {"_widget":"ALERT", "_col":1, _html:true, "title":"通知信息", type:"info", closeable:true, "content":"这里是通知信息的详细内容，详细文档请查看<a href=''>通知信息</a>" },
//     {"_widget":"CHECKBOX","_uuid":"zichan", "_text":"资产性质", options:"国有资产,外资,中外合资,其他" },
//     {"_widget":"RADIO","_uuid":"status", "_text":"经营状态", options:"正常,经营异常,已注销" },
//     {"_widget":"SWITCH","_uuid":"vip", "_text":"优质客户" },
//     {"_widget":"DATE","_uuid":"vipDate","_text":"评定日期","_col":1,"placeholder":"优质客户评定日期","clearable":true,"type":"month","format":"yyyy-MM-dd"},
//     {"_widget":"FILE","_uuid":"yyzz","_text":"营业执照", "_col":1}
// ]

export default {
    "id": "演示表单",
    "size":"medium",
    "width":"100%",
    "grid":1,
    "labelWidth":120,
    "labelShow":true,
    "labelPlacement":"top",
    "labelAlign":"left",
    "items":[
        {"_widget":"ALERT", "title":"个人信息汇总", "content":"请按真实情况填写", "closeable":true},
        {"_widget":"IMAGE","height":"auto","maxHeight":"160px","full":true,"scriptTrigger":"click","script":"","_hideLabel":true, "src": "" },
        {"_widget":"TEXT", "_value":'请<b>按照要求</b>填写信息', "_html":true },
        {"_widget":"RADIO","_uuid":"radio","_text":"性别", "options":"男,女,保密"},
        {"_widget":"DATE","_uuid":"date","_text":"出生日期"},
        {"_widget":"INPUT","_uuid":"name","_text":"专业名称"},
        {"_widget":"INPUT","_uuid":"college","_text":"所属学院"},
        {"_widget":"NUMBER","_uuid":"year","_text":"学年制", "_value": "4", "min":1, clearable: true },
        {"_widget":"SELECT","_uuid":"select","_text":"学校类型", "_value":"小学", "options":"小学,中学,高中,大学"},
        {"_widget":"CHECKBOX","_uuid":"checkbox","_text":"你最喜欢的水果", "options":"苹果,香蕉,草莓,蓝莓,菠萝"},
        {"_widget":"DIVIDER", "_col":4, "_value":"补充内容（我是一条面无表情的分割线）", "dashed":false},
        {
            "_widget":"CARD","size":"medium","width":"100%","grid":1,"labelWidth":"120px","labelShow":true, "labelPlacement":"top","labelAlign":"left",
            "_col":1,"title":"其他信息","bordered":true,"_container":true,"_hideLabel":true, "category":"single", "_uuid": "other",
            "items":[
                {"_widget":"INPUT","_uuid":"phone","_text":"您的联系方式"},
                {"_widget":"SWITCH", "_uuid":"switch","_text":"所填是否属实"},
                {"_widget":"RATE", "_uuid":"rate","_text":"您对本问卷的评分", "count":10, "allow-half":true},
            ]
        },
        {"_widget":"BUTTON","label":"自定义脚本：随机年龄","text":false,"round":false,"disabled":false,"scriptTrigger":"click","script":"form.age = Math.floor(Math.random()*20)+10;","_hideLabel":true,"type":"default"}
    ],
    "submitText":"保存",
    "url":"",
    "okText":"",
    "onLoad": "",
    "onSubmit":"",
    "onChange":"",
    "afterSubmit":"",
    "hides":[],
    "buttons":[]
}
