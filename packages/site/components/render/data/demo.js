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
        {"_widget":"NUMBER","_uuid":"year","_text":"学年制", "_value": "4", "min":1 },
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
