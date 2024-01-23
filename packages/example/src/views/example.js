import { reactive, onMounted, onUnmounted } from 'vue'

import dayjs from 'dayjs'
import { formValueProvider } from "@grid-form/common"

import ExampleAll from "./forms/all"

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

    // 如需扩展 Widgets,Components ，请自行扩写
    let form = reactive(ExampleAll)
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
