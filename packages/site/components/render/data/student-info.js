export default {
    "id": "学生信息等级表",
    "size":"medium",
    "width":"100%",
    "grid":1,
    "labelWidth":120,
    "labelShow":true,
    "labelPlacement":"top",
    "labelAlign":"left",
    "items":[
        {
            "_widget":"CARD","size":"medium","width":"100%","grid":4,"labelWidth":"120px","labelShow":true, "labelPlacement":"top","labelAlign":"left",
            "_col":1,"title":"基本信息","bordered":true,"_container":true,"_hideLabel":true,
            "items":[
                {"_widget":"IMAGE","_col":4,"height":"auto","maxHeight":"160px","full":true,"scriptTrigger":"click","script":"","_hideLabel":true, "src": "" },
                {"_widget":"INPUT","_uuid":"name","_text":"姓名","_col":1,"disabled":false,"_watch":false,"_required":false,"_regex":"","_message":"","placeholder":"请输入","clearable":false,"show-count":false,"rows":1,"_value":""},
                {"_widget":"NUMBER","_uuid":"age","_text":"年龄","_col":1,"disabled":false,"_watch":false,"_required":false,"_regex":"","_message":"","placeholder":"请输入","clearable":false, "min": 5, "max": 120},
                {"_widget":"INPUT","_uuid":"origin","_text":"籍贯","_col":1,"disabled":false,"_watch":false,"_required":false,"_regex":"","_message":"","placeholder":"请输入","clearable":false,"show-count":false,"rows":1,"_value":""},
                {"_widget":"TAGS","_uuid":"hobby","_text":"兴趣爱好","_col":1,"disabled":false,"_watch":false,"_required":false,"_regex":"","_message":"","closable":true,"round":false},
                {"_widget":"BUTTON","_col":4,"label":"自定义脚本：随机年龄","text":false,"round":false,"disabled":false,"scriptTrigger":"click","script":"form.age = Math.floor(Math.random()*20)+10;","_hideLabel":true,"type":"default"}
            ]
        },
        {
            "_widget":"CARD","size":"medium","width":"100%","grid":3,"labelWidth":"120px","labelShow":true, "labelPlacement":"top","labelAlign":"left",
            "_col":1,"title":"专业信息","bordered":true,"_container":true,"_hideLabel":true, "category":"single", "_uuid": "major",
            "items":[
                {"_widget":"INPUT","_uuid":"name","_text":"专业名称"},
                {"_widget":"INPUT","_uuid":"college","_text":"所属学院"},
                {"_widget":"NUMBER","_uuid":"year","_text":"学年制", "_value": "4", "min":1 }
            ]
        },
        {
            "_widget":"CARD","size":"medium","width":"100%","grid":6,"labelWidth":"120px","labelShow":true, "labelPlacement":"top","labelAlign":"left",
            "_col":1,"title":"教育经历","bordered":true,"_container":true,"_hideLabel":true, "category":"multiple", "_uuid": "educates", "max":3,
            "items":[
                {"_widget":"SELECT","_uuid":"type","_text":"类型", "_value":"小学", "options":"小学,中学,高中"},
                {"_widget":"INPUT","_uuid":"from","_text":"开始日期"},
                {"_widget":"INPUT","_uuid":"to","_text":"结束日期"},
                {"_widget":"INPUT","_uuid":"school","_col":3,"_text":"学校名称"}
            ]
        }
    ],
    "submitText":"保存学生信息",
    "url":"",
    "okText":"",
    "onLoad":"",
    "onSubmit":"",
    "onChange":"",
    "afterSubmit":"",
    "hides":[],
    "buttons":[]
}
