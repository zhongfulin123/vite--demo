import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import copy from 'rollup-plugin-copy' //引入插件
import {Plugin as importToCDN, autoComplete} from 'vite-plugin-cdn-import' // cdn插件
import viteCompression from 'vite-plugin-compression' //代码压缩插件
import viteImagemin from 'vite-plugin-imagemin' // 图片压缩插件
export default defineConfig({
    plugins: [vue(), copy({
        targets: [
            {src: './robots.txt', dest: './dist'},
        ]
    }), importToCDN({
        modules: [
            {
                name: 'vue',
                var: 'Vue',
                path: 'https://unpkg.com/vue@3'
            },
            {
                name: 'element-plus',
                var: 'ElementPlus',
                path: 'https://unpkg.com/element-plus',
                css: 'https://unpkg.com/element-plus/dist/index.css'
            }
        ]
    }),
        viteCompression(),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 50
            },
            pngquant: {
                quality: [1, 1],
                speed: 4
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox'
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        //      生产环境去除console
        minify: 'terser',  // 压缩模式 pnpm i -D terser
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },

    server: {
        proxy: {
            '/api': {
                target: 'https://eolink.o.apispace.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
})