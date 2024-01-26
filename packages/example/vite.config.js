import { defineConfig } from 'vite'
import { join, resolve } from 'path'

import vue from '@vitejs/plugin-vue'

let src = (suffix = "") => join(__dirname, "src", suffix) + '/'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server:{
        port: 8080
    },
    resolve: {
        alias: {
            '@/'            : src(),
            '@V/'           : src(`views`),
            '@C/'           : src("component")
        },
    },
    build: {
        rollupOptions: {
            input: {
                index   : resolve('index.html'),
                vant    : resolve('render-vant.html'),
                element : resolve('render-element.html'),
            },
        },
    },
})
