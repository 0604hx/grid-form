<template>
    <n-grid :x-gap="gridGap" :y-gap="gridGap" :cols="form.grid" class="designer-content" :style="{width: form.width, margin:'0px auto' }">
        <NFormItemGridItem v-for="(item, index) in form.items" :key="index" :span="item._col" :show-feedback="false"
            :show-label="!(item._hideLabel === true || !form.labelShow)" :label-placement="form.labelPlacement" :label-align="form.labelAlign"
            @click.stop="bindClick(item)" class="cell" :class="{active:item._active === true}"  @contextmenu.stop="e=>contextMenu && contextMenu.show(e, index, containerInstance)">
            <template #label>
                {{item._text}}<span v-if="item._required" style="color: red;font-weight: 600;">*</span>
            </template>
            <n-popconfirm @positive-click="()=> form.items.splice(index, 1)">
                <template #trigger>
                    <n-button class="remove" secondary type="error" size="tiny" circle> <template #icon> <n-icon :component="Trash" /> </template> </n-button>
                </template>
                删除 <n-text code>{{ item._uuid?`${item._uuid}/${item._text||item.title}`:`该组件（${item._widget}）` }}</n-text> 吗？
            </n-popconfirm>

            <component v-if="item._container && item.items" :is="buildComponent(item, renders, track)">
                <!--内嵌的容器-->
                <designer-container :form="item" :gridGap="gridGap" :contextMenu="contextMenu" :bindClick="bindClick" :renders="renders"
                    :components="components" :track="track" />

                <div v-if="item.category === 'multiple'" style="margin-top: 10px; text-align: center;">
                    <n-popover trigger="hover">
                        <template #trigger>
                            <n-button size="small" circle>+</n-button>
                        </template>
                        点此可添加新的数据行（按本容器的组件配置），可设置数据行上限
                    </n-popover>
                </div>
            </component>
            <component v-else :is="buildComponent(item, renders, track)" />
        </NFormItemGridItem>

        <NGridItem class="cell flex" :class="{top}" style="align-items: center; justify-content: center;">
            <Selector @select="onAddComponent" :components="components" :top="top" />
        </NGridItem>
    </n-grid>
</template>

<script>
    //给组件命名
    export default { name: 'designer-container' }
</script>

<script setup>
    import { ref, reactive } from 'vue'
    import { Trash } from "@vicons/fa"
    import { useMessage, useDialog, NIcon, NButton, NText, NPopconfirm,NPopover, NFormItemGridItem, NGridItem, NGrid  } from "naive-ui"

    import { createFormItem, buildComponent } from '@grid-form/common'

    import Selector from "./components/selector.vue"

    const message = useMessage()
    const dialog = useDialog()

    const props = defineProps({
        top:{type:Boolean, default: false},                     //是否为顶层容器
        gridGap: {type:Number, default: 10},                    //栅栏间隔，单位 px
        renders:{type:Object},                                  //具体的组件渲染函数
        components:{type:Array, default:[]},                    //可选的组件
        form: {type:Object},
        contextMenu: {type:Object},                             //开启右键菜单
        track: {type:Function},
        bindClick: {type:Function}
    })

    const onAddComponent = row=> doAddComponent(createFormItem(row))
    const doAddComponent = (item, position=-1)=> {
        if(props.track) {
            message.info(`添加组件：${item._text||item._widget}`)
            props.track(`添加表单项 ${item._widget} `, item)
        }

        // 对于子容器，默认占满整行
        if(item._container===true)  item._col = props.form.grid

        if(position<=-1)
            props.form.items.push(item)
        else
            props.form.items.splice(position, 0, item)
    }

    const containerInstance = {
        add     : doAddComponent,
        copy    : index=> JSON.stringify(props.form.items[index]),
        remove  : index=> {
            let item = props.form.items[index]
            item && dialog.warning({
                title:`删除组件`,
                content: `确定删除表单项⌈${item._text||item._widget}⌋吗？`,
                positiveText: "确定",
                negativeText: "我再想想",
                onPositiveClick: () => props.form.items.splice(index, 1)
            })
        }
    }
</script>

