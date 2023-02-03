let buildChartData = (len=10, type="bar", v=100)=> {
    let data = []
    for (let i = 0; i < len; i++) {
        data.push({name:"项目"+(i+1), value:Math.floor(Math.random()*v)})
    }
    return type=='bar'? data: {type, data}
}

export function demoLayouts(){
    let id = Math.random() * 100
    let content = [
        ["序号","姓名","推荐人","部门","入职日期"],
        ["1","张三",id,"办公室","2016-10-26"],
        ["2","李四",id,"信息科技部","2016-10-26"],
        ["3","王五",id,"销售一部","2016-10-26"]
    ]
    return [
        {
            layout:"md", title:"MarkDown",
            content:`## 查询结果
> 此为动态页面查询结果演示内容（markdown格式）

键/Key|值/Value
-----|-----
经营性收入|1000W
净利润|200W`
        },
        {
            layout:"html",title:"HTML",
            content:`<div><h3>查询结果</h3> 此为动态页面查询结果演示内容<code class="bg-info">（HTML格式）</code> ，跳转到<a onclick="JUMP('/other/about')">关于页面</a></div>`
        },
        {
            layout:"list",title:"List",
            content: {
                title:"Group 分组标题", inset:false,
                cells:[
                    {title:"单元格1", value:"内容1", label:"单元格描述信息", icon:"user-o", to:""},
                    {title:"单元格2", value:"内容2", label:"单元格描述信息", icon:"user-o", to:""},
                    {title:"单元格3", value:"内容3", label:"单元格描述信息", icon:"user-o", to:""}
                ]
            }
        },
        { layout:"chart", title:"柱状图", content: buildChartData() },
        { layout:"chart", title:"饼状图", content: buildChartData(5, "pie") },
        { layout:"table", title:"表格数据",  content },
        { layout:"json", title:"JSON", content}
    ]
}
