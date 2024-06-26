---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "格子表单/GRID-FORM"
  tagline: 基于 GRID 布局的 VUE3 表单工具<br>包含可视化设计器、渲染器（多UI库）
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 在线可视化设计器
      link: /demo/designer
    - theme: alt
      text: 博客专栏
      link: https://blog.csdn.net/ssrc0604hx/category_12570844.html
  image:
      src: /designer.webp
      alt: GRID-FORM

features:
  - title: 可视化设计器
    details: 基于 <a target=_blank href="https://www.naiveui.com">Naive UI</a> 组件库，所见即所得
    icon:
      src: /rocket.svg
      width: 40
  - title: Naive UI
    details: 默认渲染器，支持设计器中的全部组件
    icon:
      src: /naive-ui.svg
      width: 33
  - title: Element Plus
    details: 使用优秀 <a target=_blank href="https://element-plus.org/">Element Plus</a> 组件库的渲染器
    icon:
      src: /element-plus.svg
      width: 40
  - title: Vant
    details: 适配移动终端的渲染器（<a target=_blank href="https://vant-ui.github.io">Vant4</a> 以上版本）
    icon:
      src: vant.png
      width: 40
    
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #18A058 30%, #00C9D7);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #18A058 50%, #00C9D7 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

.VPFeatures .details a {
    text-decoration-line: underline;
    text-underline-offset: 2px;
}

@media (min-width: 960px) {
    .image-src {
        margin-top:10px;
        max-width: 440px !important;
    }
}
</style>
