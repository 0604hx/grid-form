<template>
    <van-form @failed="onFailed" :label-width="form.labelWidth" :label-align="form.labelAlign">
        <van-cell-group inset>
            <!-- <van-field v-for="(item, index) in form.items"
                v-model="formData[item._uuid]" :label="item._text" :placeholder="'请输入'+item._text"
                :name="item._uuid"
            /> -->
            <template v-for="(item, index) in form.items">
                <component v-model="formData[item._uuid]" :is="buildComponent(item, RenderFuncs[item._widget], false)" />
            </template>
        </van-cell-group>
        <!-- <van-cell-group inset>
          <van-field
            v-model="value1"
            name="pattern"
            placeholder="正则校验"
            :rules="[{ pattern, message: '请输入正确内容' }]"
          />
          <van-field
            v-model="value2"
            name="validator"
            placeholder="函数校验"
            :rules="[{ validator, message: '请输入正确内容' }]"
          />
          <van-field
            v-model="value3"
            name="validatorMessage"
            placeholder="校验函数返回错误提示"
            :rules="[{ validator: validatorMessage }]"
          />
          <van-field
            v-model="value4"
            name="asyncValidator"
            placeholder="异步函数校验"
            :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
          />
        </van-cell-group> -->
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit" @click="toSubmit">{{form.submitText}}</van-button>
        </div>
    </van-form>
</template>

<script setup>
    import { h, ref } from 'vue'

    import { buildComponent } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import { Field, CellGroup } from 'vant';

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " Vant4")

    const onFailed = e=>console.debug(e)

    const inputField = (props, attrs)=>{
        let ps = {
            label               : attrs._text,
            placeholder         : props.placeholder,
            "show-word-limit"   : props["show-count"],
            clearable           : props.clearable,
            rows                : props.rows,
            maxlength           : props.maxlength,
            type                : attrs._widget=='NUMBER'?"number":"text"
        }
        return h(Field, ps)
    }
    const RenderFuncs = {
    "INPUT"     : inputField,
    "NUMBER"    : inputField,
    "SELECT"    : (props, attrs)=> h('div', {}, attrs._text),
    "TAGS"      : (props, attrs)=> undefined
}
</script>
