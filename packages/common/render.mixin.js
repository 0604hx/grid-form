import { ref, reactive, toRaw, unref, onMounted, computed, nextTick, watch } from 'vue'

import { triggerLoaded, triggerBeforeSubmit, triggerChanged,  triggerExtraButtonClick, formValueProvider, extendFormItems } from './runtime'

const DEFAULT_ACTION= "post"
const MULTIPLE      = "multiple"
const SIMPLE        = "simple"
const SINGLE        = "single"

export const RenderProps = {
    renders:{type:Object},
    form: {type:Object},
    transformNumber: {type:Boolean, default: true},         //是否将 NUMBER、RATE 等类型的值，转换为数值型
    initValue: {type:Object},                               //外部的表单初始值
    gridGap: {type:Number, default: 10},                    //栅栏间隔，单位 px
    debug: {type:Boolean, default: false},                  //开启debug 模式后，会在控制台输入各种信息
    review: {type:Boolean, default: true},                  //是否做表单项检验
    placeholder: {type:String, default:"^\\${(.*)}$"},      //默认值的占位符检测正则表达式，符合该表达式的默认值将进行运算
    valueProvider:{type:Object, default:formValueProvider },
    lockLabelPlacement:{type:String},                       //限定标签位置；顶部标签在手机上视觉效果不佳，可通过此限定标签位于左侧
}

export const RenderEvent = ["submit", "failed", "inited"]

export default (props, emits, suffix="")=>{
    let inited = ref(false)
    const formData = reactive({ _disabled:false })

    const watchFields  = new Set()

    /**
     * 此处使用JSON反序列化的方式去响应式
     *
     * 1、使用 toRaw(unref(obj)) 的方式效果不佳（依旧存在响应式）
     * 2、JSON.parse(JSON.stringify(obj.value||obj)) 简单粗暴，但是对于 obj 内的复杂对象（如 File）会在转换后丢失
     * 3、[选用] 遍历 Obect、Array 进行 toRaw 操作
     */
    const _raw = obj=> {
        if(typeof(obj) === 'object'){
            let shadow = {}
            Object.keys(obj).forEach(k=> shadow[k] = toRaw(unref(obj[k])))

            return shadow
        }
        else if(Array.isArray(obj)){
            return obj.map(v=> toRaw(unref(v)))
        }
        return toRaw(unref(obj))
    }

    const track = (...ps)=> console.debug(`%c[RENDER${suffix}]`, "background:#8c0776;padding:3px;color:white", ...ps)

    /**
     * 跟踪数据变动，未来可考虑添加回调函数
     */
    // watch(formData, (v, v2, v3)=>{
    //     track("表单数据更新", formData, v)
    // })

    /**
     * 检测必填项
     * 子表单（非 SIMPLE）必填无法正常检测
     *      https://github.com/0604hx/grid-form/issues/3
     *
     * @param {Array<import('.').FormItem>} items - 表单定义项
     * @param {Object} bean - 与 items 对应的数据对象
     * @param {Array<String>} fails - 错误清单
     * @param {String} prefix - 前缀文本
     */
    const _checkRequire = (items, bean, fails, prefix="")=>{
        for(const item of items){
            if(item._container === true){
                switch(item.category){
                    case SINGLE:
                        _checkRequire(item.items, bean[item._uuid]||{}, fails)
                        break
                    case MULTIPLE:
                        const rows = bean[item._uuid]
                        if(Array.isArray(rows)){
                            for (let i = 0; i < rows.length; i++) {
                                const row = rows[i]
                                _checkRequire(item.items, row, fails, `[${item._text||item.title}的第${i+1}条]`)
                            }
                        }
                        break
                    default:
                        _checkRequire(item.items, bean, fails)
                }
            }
            else if(item._required == true){
                //检查必填表单项是否符合预期
                if(!bean[item._uuid])
                    fails.push(`${prefix}${item._text}（${item._uuid}）未填写`)
                else{
                    if(!!item._regex && !RegExp(item._regex).text(bean[item._uuid]))
                        fails.push(prefix+(item._message || `${item._text}（${item._uuid}）校验未通过：${item._regex}`))
                }
            }
        }
    }

    const _submitDo = (formObj, action=DEFAULT_ACTION) =>{
        delete formObj['_disabled']

        const fails = []

        //校验错误字段
        if(props.review == true)
            _checkRequire(props.form.items, formObj, fails)

        if(fails.length){
            props.debug && track(`[表单检查]`, fails)
            return emits("failed", fails)
        }

        emits("submit", formObj, action)
    }

    /**
     * 点击主按钮时回调
     *
     */
    const toSubmit = ()=>{
        let { onSubmit } = props.form
        let formObj = _raw(formData)
        if(!!onSubmit && typeof(onSubmit==='string')){

            triggerBeforeSubmit(onSubmit, formData, _raw(props.form.items)).then(obj=>{
                if(props.debug) track("<onSubmit> 回调函数返回（仅当返回布尔 true 方能继续提交表单）", obj)
                if(obj === true){
                    // emits("submit", _raw(formData), DEFAULT_ACTION)
                    _submitDo(_raw(formData))
                }
                else{
                    if(props.debug) track(`<onSubmit> 回调函数返回非 true ，中断表单提交`)
                }
            })
        }
        else{
            _submitDo(formObj)
        }
    }

    const _computeValue = async (text, id)=>{
        /**
         * 对于符合 placeholder 的特定默认值（如 ${date}）
         * 判断 valueProvider 是否具备其处理函数，若存在，则调用（支持 Promise 返回）并将返回值作为表单值
         *
         * 下方注释的代码是针对去除开始的 ${ 及结尾的 } 符号后的代码实现，如需可启用
         */
        if(RegExp(props.placeholder).test(text) && (text in props.valueProvider)){
            // 支持 Promise 形式的返回，但是未作异常捕获
            let computedVal = await props.valueProvider[text]()
            if(props.debug) track(`[表单值计算 #${id}]`, text," > ", computedVal)

            return computedVal
        }

        // let holder = RegExp(props.placeholder).exec(v._value)
        // if(holder && !!holder[1] && (holder[1] in props.valueProvider)){
        //     let computedVal = await props.valueProvider[holder[1]]()
        //     if(props.debug) track(`[表单值计算 #${id}]`, v._value," > ", computedVal)

        //     formData[id] = computedVal
        // }
        return text
    }

    const _setupWatchForChange = ()=>{
        let { onChange } = props.form
        if(watchFields.size && !onChange)       return props.debug && track(`<onChange> 尝试监听 ${watchFields.size} 个表单项变动事件，但未定义 onChange 回调代码...`)
        if(watchFields.size == 0 && !!onChange) return props.debug && track(`<onChange> 已定义 onChange 回调代码，但未对任何表单项设置监听选项...`)

        //开启监听
        if(watchFields.size && onChange){
            watchFields.forEach(key=>{
                watch(()=> formData[key], (to, from)=>{
                    if(props.debug) track(`<onChange> 触发表单项 ${key} 变动：${from} > ${to}`)
                    triggerChanged(props.form.onChange, formData, {key, from, to}, props.form.items)
                })
            })
        }
    }

    /**
     * 递归计算表单初始值
     * @param {Array<import('.').FormItem>} items
     */
    const _initFormValue = async (items, bean)=>{
        if(Array.isArray(items)){
            for (const v of items) {
                if(!!v._uuid){
                    // 如果没有初始值，则尝试自动计算
                    if(bean[v._uuid] == undefined){
                        let itemV = await _computeValue(v._value, v._uuid)
                        // 处理布尔型的默认值
                        if(v._widget === "SWITCH" && typeof(itemV)!='boolean'){
                            itemV = typeof(itemV)==='string'? itemV.toLowerCase()=='true': (typeof(itemV)==='number'? itemV != 0: !!itemV)
                        }
                        else if((v._widget === 'RATE' || v._widget === 'NUMBER') && props.transformNumber && !isNaN(itemV)){
                            itemV = Number(itemV)
                        }
                        bean[v._uuid] = itemV
                    }

                    if(v._watch === true)
                        watchFields.add(v._uuid)
                }
                if(v._container===true){
                    //默认为简单布局容器
                    v.category = v.category||SIMPLE

                    if(v.category == SINGLE && typeof(bean[v._uuid]) != 'object')
                        bean[v._uuid] = {}

                    //对于多行表单，赋予初始值
                    else if(v.category == MULTIPLE && !Array.isArray(bean[v._uuid]))
                        bean[v._uuid] = []

                    await _initFormValue(v.items, v.category == SIMPLE? bean: bean[v._uuid])
                }
            }
        }
    }

    const initForm = async ()=>{
        let { items, hides } = props.form

        //处理默认值，add on 2023-02-02
        if(Array.isArray(hides)){
            for(let v of hides){
                if(!!v.id) {
                    formData[v.id] = await _computeValue(v.value, v.id)
                }
            }
        }
        //处理外部默认值，add on 2024-03-15
        if(props.initValue)
            Object.assign(formData, props.initValue)

        if(props.debug) track("开始计算表单值", formData)
        await _initFormValue(items, formData)
        if(props.debug) track("完成计算表单值", formData)

        _setupWatchForChange()

        items && extendFormItems(items)

        nextTick(()=>{
            if(props.form.onLoad){
                if(props.debug) track("<onLoad> 触发表单初始化事件")
                triggerLoaded(props.form.onLoad, formData, props.form.items)
            }

            inited.value = true
            emits("inited")
        })
    }

    const onExtraBtn = btn=>{
        let result = triggerExtraButtonClick(btn.code, formData)
        if(btn.type == 'script')    return

        if(result !== true){
            if(props.debug) track(`<自定义按钮点击> 返回 ${result} 故中断后续的动作`)
            return
        }

        _submitDo(_raw(formData), btn.type)
    }

    //注册执行代码的回调函数
    if(props.renders){
        props.renders.runScript = itemOrScript =>{
            let script = typeof(itemOrScript) === 'string'? itemOrScript:itemOrScript.script
            if(props.debug) track(`执行组件脚本：`, script)

            if(!!script){
                triggerLoaded(script, formData, props.form.items)
            }
        }
    }

    onMounted(initForm)

    // setTimeout(()=>{
    //     if(inited.value === false)  initForm()
    // }, 1000)

    return {
        _raw, track,
        inited, formData,
        toSubmit, onExtraBtn
    }
}

/**
 * 渲染容器的通用入口参数
 */
export const ContainerProps = {
    renders:{type:Object},
    form: {type:Object},
    gridGap: {type:Number, default: 10},
    formData: {type:Object},
    lockLabelPlacement: {type:String}
}

/**
 * 渲染容器通用方法
 * @param {Object} props
 * @returns
 */
export const ContainerMixin = props=>{
    const isMultiple = computed(()=> props.form._container === true && props.form.category === MULTIPLE)

    const canAdd = computed(()=> {
        if(!isMultiple.value)    return false
        let { max } = props.form
        return (isNaN(max) || max == 0 || props.formData.length < max)
    })

    const childForm = item=>{
        return !item.category || item.category == SIMPLE? props.formData : props.formData[item._uuid]
    }

    const onAddRow = ()=>{
        if(!isMultiple) throw Error(`暂不支持添加新数据行`)

        const keys = Object.keys(props.formData).slice(props.formData.length)
        let row = {}
        keys.forEach(k=> row[k] = props.formData[k])
        props.formData.push(row)
    }

    return { isMultiple, canAdd, childForm, onAddRow }
}
