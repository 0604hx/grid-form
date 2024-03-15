import { reactive, onMounted, onUnmounted } from 'vue'

import dayjs from 'dayjs'
import { formValueProvider, createForm } from "@grid-form/common"

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

export function RenderDemo(originFormBean={}){
    // 如需扩展 Widgets,Components ，请自行扩写
    let form = reactive(createForm(originFormBean))
    let result = reactive({data:{}, action:""})

    const onInited = ()=> Object.assign(result, {data:"表单渲染完成^.^" })

    const onSubmit = (formObj, action)=> {
        Object.assign(result, {data:formObj, action})
    }

    const onFailed = data=>  Object.assign(result, {data })

    return { form, onInited, onFailed, onSubmit, result }
}

export const renderProps = {
    form: {type:Object, default:{}},
    initValue:{type:Object},
    onSubmit: {type:Function},
    onInited: {type:Function},
    onFailed: {type:Function}
}
