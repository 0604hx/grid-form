import { defineConfig } from 'vite'
import { join } from 'path'

import vue from '@vitejs/plugin-vue'

let src = (suffix = "") => join(__dirname, "src", suffix) + '/'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server:{
        port: 10086
    },
    resolve: {
        alias: {
            '@/'            : src(),
            '@V/'           : src(`views`),
            '@C/'           : src("component")
        },
    },
})
