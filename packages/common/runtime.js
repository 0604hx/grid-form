const onLoadTemplate = `
/**
 * 表单加载完成后触发，参数：
 *  form - 当前表单值（Object），可以修改对应值
 *  items - 表单定义（Array），支持动态修改表单项（如下拉框的选项内容）
 */
console.debug("表单值", form)
// 更新 _uuid 为 type 的下拉框选项
items.$('type').options = '个人,企业'
`
const onSubmitTemplate = `
/**
 * 表单提交前触发（Promise形式），参数：
 *  form - 当前表单值（Object），可以修改对应值
 *  items - 表单定义（Array）
 */
console.debug("表单值", form)
//继续提交
resolve(true)
`
const onChangeTemplate = `
/**
 * 表单值变动时触发（表单项需勾选监听变动），参数：
 *  form - 当前表单值（Object），可以修改对应值
 *  agent - 当前变动的表单项详情（key=表单项ID、from=旧值、to=新值）
 *  items - 表单定义（Array）
 */
console.debug("表单值变动：", agent.key, "从 "+agent.from+" 变更为 "+agent.to)
`

export const lifeCycles = [
    { name:"onLoad", text:"加载完成时", summary:"表单加载完成后调用，参数格式为：function onLoad(form, items)", promise:false, template: onLoadTemplate },
    { name:"onSubmit", text:"表单提交前", summary:"表单提交前触发，以 Promise 形式返回，当报错或者返回非 true 时中断提交，参数：form, items", promise:true, template: onSubmitTemplate },
    { name:"onChange", text:"表单值变动时", summary:"表单值变动时出发，参数格式为：function onChange(form, agent, items)", promise: false, template: onChangeTemplate },
    { name:"afterSubmit", text:"表单提交后", summary:"表单成功提交后触发，参数格式为：function afterSubmit(form)", promise:false},
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
        if(typeof(body) === 'function')
            return body(...params)
        return new Function(...paramsNames, buildFuncBody(body, false))(...params)
    }
    catch(e){
        _showError(e, eventName)
    }
}

/**
 * 表单初始化后调用
 * @param {String} body
 * @param {Object} form
 * @param {Array} items
 * @returns
 */
export function triggerLoaded(body, form, items){
    return _triggerWithoutPromise(body, "onLoad", ["form", "items"], [form, items])
}

/**
 * 返回 Promise 对象，可以捕获异常继而中断提交
 * @param {String} body
 * @param {Object} form
 * @param {Array} items
 * @returns
 */
export function triggerBeforeSubmit(body, form, items){
    if(typeof(body) === 'function'){
        return new Promise((resolve)=> Promise.resolve(body(form, items)).then(v=> resolve(v)) )
    }

    return new Function("form", "items", buildFuncBody(body))(form, items).catch(e=> _showError(e, "onSubmit"))
}

/**
 *
 * @param {String} body
 * @param {Object} form
 * @param {Array} agent
 * @returns
 */
export function triggerChanged(body, form, agent, items){
    return _triggerWithoutPromise(body, "onChange", ["form","agent", "items"], [form, agent, items])
}

/**
 * 表单提交后触发
 * @param {String} body
 * @param {Object} form
 */
export function triggerAfterSubmit(body, form){
    return _triggerWithoutPromise(body, "afterSubmit", ["form"], [form])
}

export function triggerExtraButtonClick(body, form){
    return _triggerWithoutPromise(body, "extraBtnClick", ["form"], [form])
}

/**
 * 扩展表单项数组
 * @param {Array} items
 */
export const extendFormItems = items=>{

    const isMatch = (t, condition)=>{
        if(t._uuid == condition)    return true
        //多值比对
        return Object.keys(condition).every(v=> t[v]==condition[v])
    }

    /**
     * 给 items 注入 $ 方法，便于按 指定条件 递归找到表单项，用法：
     *  items.$("name").disabled = true                             //找到编号为 name 的表单项，并禁用
     *  items.$({_uuid:"name", "_text":"专业名称"}).disabled = true
     *
     * @param {String|Object} uuid - 编号或者Object
     * @returns {import(".").FormItem}  只返回符合条件的第一个表单项
     */
    items.$ = function(uuid){
        const queue = [...this]
        while(queue.length){
            const t = queue.shift()
            if(isMatch(t, uuid)) return t

            if(t._container === true && Array.isArray(t.items))
                queue.push(...t.items)
        }
    }
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
