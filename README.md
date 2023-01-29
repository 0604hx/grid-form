<div align=center>
<h1> <img src="packages/example/public/logo.svg" width=40 />  栅栏（格子）表单 / GRID-FORM </h1>

![Language](https://img.shields.io/github/languages/top/0604hx/grid-form?logo=javascript&color=blue)
![License](https://img.shields.io/badge/License-MIT-green)
![LastCommit](https://img.shields.io/github/last-commit/0604hx/grid-form?color=blue&logo=github)

</div>

基于 GRID 布局的简单表单工具（包含可视化设计器、渲染器），默认组件库为 [Naive UI](https://www.naiveui.com)

## 总览 / OVERVIEW

![框架](docs/screenshot/overview.png)

![设计器](docs/screenshot/designer.png)

![渲染器](docs/screenshot/render.png)

## 开始使用 / GETTING STARTED

### 仅使用渲染器

1. 安装依赖

```shell
npm i -S @grid-form/render-naive
# OR
yarn add @grid-form/render-naive
```

2. 使用渲染器组件

```html
<FormRender :renders="RenderFuncs" :form="form" @submit="onSubmit" @failed="onFailed" @inited="onInited" debug />
```

```javascript
import { FormRender, RenderFuncs } from "@grid-form/render-naive"

// 如需扩展 RenderFuncs 请自行扩写
// 详细的 form 数据结构请查看 packages/example/src/views/渲染器.vue
let form = reactive({})
```

### 使用设计器

```shell
npm i -S @grid-form/designer
# OR
yarn add @grid-form/designer
```

```html
<Designer :renders="RenderFuncs" :components="Components" :compact="false" :form="form" style="height: 100vh;" debug show-footer />
```

```javascript
import { reactive } from 'vue'
import { Designer, Components } from "@grid-form/designer"
import { RenderFuncs } from "@grid-form/render-naive"
import { createForm } from "@grid-form/common"

// 如需扩展 RenderFuncs、Components ，请自行扩写
let form = reactive(createForm())
```

## 开发 / DEVELOPMENT

```shell
# 拉取最新代码

# 安装依赖
pnpm i

# 运行示例
pnpm -F example run dev
```

## 附录 / ABOUT

### 说明

1. 此组件仅为个人学习
2. LOGO 来自[阿里巴巴矢量图标库](https://www.iconfont.cn/)
