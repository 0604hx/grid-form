<template>
    <div v-if="!inited" style="text-align: center;">
        <van-loading vertical>表单渲染中...</van-loading>
    </div>
    <template v-else>
        <Container :form="form" :formData="formData" :renders="renders" :lockLabelPlacement="lockLabelPlacement" />

        <van-space direction="vertical" fill style="margin: 16px;">
            <van-button v-if="form.submitText" block type="primary" native-type="submit" @click="toSubmit">{{form.submitText}}</van-button>
            <van-button v-for="btn in form.buttons" block :type="toTheme(btn.theme)" @click="onExtraBtn(btn)">{{btn.text}} </van-button>
        </van-space>
    </template>
</template>

<script setup>
    import { h, ref } from 'vue'
    import { Loading as VanLoading, Space as VanSpace, Button as VanButton } from 'vant'

    import { buildComponent, buildOptions } from '@grid-form/common'
    import { default as RenderMixin, RenderEvent, RenderProps } from '@grid-form/common/render.mixin'

    import Container from './container.vue'

    const emits = defineEmits(RenderEvent)
    const props = defineProps(RenderProps)

    let { inited, formData, toSubmit, onExtraBtn } = RenderMixin(props, emits, " Vant4")

    const toTheme = type=> type=='info'? 'primary':type

    // const items =[
    //     {"_widget":"DIVIDER", "_col":1, "dashed":true, "title-placement":"center", "_value":"我是分割线"},
    //     {"_widget":"TEXT","_col":1, _value:"这个是<b style='color:blue'>文本显示</b>", _html:true },
    //     {"_widget":"ALERT", "_col":1, _html:true, "title":"通知信息", type:"info", closeable:true, "content":"这里是通知信息的详细内容，详细文档请查看<a href=''>通知信息</a>" },
    //     {"_widget":"CHECKBOX","_uuid":"zichan", "_text":"资产性质", options:"国有资产,外资,中外合资,其他" },
    //     {"_widget":"RADIO","_uuid":"status", "_text":"经营状态", options:"正常,经营异常,已注销" },
    //     {"_widget":"SWITCH","_uuid":"vip", "_text":"优质客户" },
    //     {"_widget":"DATE","_uuid":"vipDate","_text":"评定日期","_col":1,"placeholder":"优质客户评定日期","clearable":true,"type":"month","format":"yyyy-MM-dd"},
    //     {"_widget":"FILE","_uuid":"yyzz","_text":"营业执照", "_col":1}
    // ]
</script>
