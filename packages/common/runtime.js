export const lifeCycles = [
    { name:"onLoad", text:"加载完成", summary:"表单加载完成后调用，参数格式为：function onLoad(form)", promise:false},
    { name:"onSubmit", text:"表单提交前", summary:"表单提交前触发，以 Promise 形式返回，当报错或者返回 false 时中断提交", promise:true},
    { name:"afterSubmit", text:"表单提交后", summary:"表单成功提交后触发，参数格式为：function afterSubmit(form)", promise:false}
]

let _showError = (e, funcType)=> console.error(`${funcType} 回调执行异常`, e)

function buildFuncBody(body, usePromise=true){
    return usePromise?
        `return new Promise((resolve, reject)=>{
            ${body}
        })`
        :
        body
}

function _triggerWithoutPromise(body, eventName, paramsNames, params){
    try{
        return new Function(...paramsNames, buildFuncBody(body, false))(...params)
    }
    catch(e){
        _showError(e, eventName)
    }
}

export function triggerLoaded(body, form){
    return _triggerWithoutPromise(body, "onLoad", ["form"], [form])
}

/**
 * 返回 Promise 对象，可以捕获异常继而中断提交
 * @param {*} body
 * @param {*} form
 * @param {*} items
 * @returns
 */
export function triggerBeforeSubmit(body, form, items){
    return new Function("form", "items", buildFuncBody(body))(form, items).catch(e=> _showError(e, "onSubmit"))
}

/**
 * 表单提交后触发
 * @param {*} body
 * @param {*} form
 */
export function triggerAfterSubmit(body, form){
    // return new Function("form", buildFuncBody(body, false))(form)
    return _triggerWithoutPromise(body, "afterSubmit", ["form"], [form])
}

export function triggerExtraButtonClick(body, form){
    return _triggerWithoutPromise(body, "extraBtnClick", ["form"], [form])
}

/**
 * 根据占位符计算表单项的默认值
 * @param {*} code
 * @returns
 */
// export function computeDefaultValue (code){
//     if(code=='${date}')             return D.date()
//     if(code=='${yesterday}')        return D.addDay(-1)
//     if(code=='${month}')            return D.date(Date(), "YYYY-MM")
//     if(code=='${monthBegin}')       return D.beginOf()
//     if(code=='${monthEnd}')         return D.endOf()
//     if(code=='${lastMonthBegin}')   return D.addDay(-1, D.beginOf(), 'month')
//     if(code=='${lastMonthEnd}')     return D.addDay(-1, D.endOf(), 'month')
//     if(code=='${yearBegin}')        return D.beginOf('year')
//     if(code=='${yearEnd}')          return D.endOf('year')
//     return eval("`"+code+"`")
// }

/**
 * 根据占位符计算表单项的默认值
 *
 * 支持 Promise 形式的返回
 */
export const formValueProvider = {}
