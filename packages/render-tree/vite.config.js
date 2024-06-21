import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const name = "render"

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/index.js',
            formats: ['es']
        },
        rollupOptions:{
            output:{
                assetFileNames: `${name}[extname]`,
                entryFileNames: `${name}.js`
            }
        }
    },
    define: {
        'process.env': process.env
    }
})
