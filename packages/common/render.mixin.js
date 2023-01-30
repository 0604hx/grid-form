import { ref, reactive, toRaw, unref, onMounted, nextTick } from 'vue'

import { triggerLoaded, triggerBeforeSubmit, triggerExtraButtonClick, computeDefaultValue } from './runtime'

export const RenderProps = {
    renders:{type:Object},
    form: {type:Object},
    gridGap: {type:Number, default: 10},            //栅栏间隔，单位 px
    debug: {type:Boolean, default: false},          //开启debug 模式后，会在控制台输入各种信息
    review: {type:Boolean, default: true},          //是否做表单项检验
}

export const RenderEvent = ["submit", "failed", "inited"]

export default (props, emits, suffix="")=>{
    let inited = ref(false)
    const formData = reactive({ _disabled:false })
    /**
     * 当表单项设置为必填时，会向该对象赋值
     */
    const formRequired = {}

    /**
     * 此处使用JSON反序列化的方式去响应式
     *
     * 使用 toRaw(unref(obj)) 的方式效果不佳
     */
    const _raw = obj=> JSON.parse(JSON.stringify(obj.value||obj))

    const track = (...ps)=> console.debug(`%c[RENDER${suffix}]`, "background:#8c0776;padding:3px;color:white", ...ps)

    /**
     * 跟踪数据变动，未来可考虑添加回调函数
     */
    // watch(formData, v=>{
    //     //track("表单数据更新", formData, v)
    // })

    const _submitDo = (formObj, action='post') =>{
        delete formObj['_disabled']

        if(props.review){
            //进行表单项校验
            let fails = []
            Object.keys(formRequired).forEach(key=>{
                let { regex, msg, label } = formRequired[key]
                if(!formObj[key])   fails.push(`${label}（${key}）未填写`)
                else{
                    if(!!regex && !RegExp(regex).test(formObj[key])) {
                        fails.push(msg||`${label}（${key}）校验未通过`)
                    }
                }
            })

            if(fails.length)    return emits("failed", fails) //M.dialog({content: H.html(fails.map((f,i)=>`${i+1}. ${f}`).join("<br >")), title:"表单校验未通过", type:"error"})
        }

        emits("submit", formObj, action)
    }

    const toSubmit = ()=>{
        let { onSubmit } = props.form
        if(!!onSubmit && typeof(onSubmit==='string')){
            triggerBeforeSubmit(onSubmit, formData, _raw(props.form.items)).then(obj=>{
                if(props.debug) track("<onSubmit> 回调函数返回（仅当返回布尔 true 方能继续提交表单）=", obj)
                if(obj === true){
                    _submitDo(typeof(obj) === 'object'? obj: _raw(formData))
                }
                else{
                    if(props.debug) track(`<onSubmit> 回调函数返回非 true ，中断表单提交`)
                }
            })
        }
        else{
            _submitDo(_raw(formData))
        }
    }
    const initForm = ()=>{
        let items = props.form.items
        items.forEach(v=> {
            let id = v._uuid
            if(!!id){
                formData[id] = /^\${.*}$/.test(v._value) ? computeDefaultValue(v._value): v._value
                if(v._required === true){
                    formRequired[id] = { regex: v._regex, msg: v._message, label: v._text }
                }
            }

        })

        if(props.debug) track("表单值", formData)
        nextTick(()=>{
            if(props.form.onLoad){
                if(props.debug) track("<onLoad> 触发表单初始化事件")
                triggerLoaded(props.form.onLoad, formData)
            }

            inited.value = true
            emits("inited")
        })
    }
    const onExtraBtn = btn=>{
        let result = triggerExtraButtonClick(btn.code, formData)
        if(btn.type == 'script')    return

        if(result === false){
            if(props.debug) track(`<自定义按钮点击> 返回 ${result} 故中断后续的动作`)
            return
        }

        _submitDo(_raw(formData), btn.type)
    }

    onMounted( initForm )

    return {
        _raw, track,
        inited, formData, formRequired,
        toSubmit, onExtraBtn
    }
}

