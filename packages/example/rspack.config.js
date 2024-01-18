const path = require('path')
const { HtmlRspackPlugin, DefinePlugin, CopyRspackPlugin } = require("@rspack/core")
const { VueLoaderPlugin } = require("vue-loader")

let resolve = dir=>path.join(__dirname, dir)

/** @type {import('@rspack/cli').Configuration} */
const config = {
	context: __dirname,
	devtool: false,
	entry: "./src/main.js",
    devServer:{
        host:"localhost",
        port: 8080,
        client: { progress: false },
        client: {
            overlay: false
        }
    },
    resolve:{
        extensions: ['.js', '.vue', '.json', ".css"],
        alias: {
            '@'             : resolve('src'),                               //代码目录
            '@V'            : resolve('src/views'),
        }
    },
    output:{
        //在生成产物前，删除输出目录下的所有文件
        clean: true,
        publicPath: "/",
        filename: `static/[name].[contenthash].js`,
    },
	plugins: [
        new VueLoaderPlugin(),
        new HtmlRspackPlugin({
            template:"./index.html",
            // templateParameters: {
            //     //配置模板参数，通过 <%= 变量名 %> 使用，此处模拟 vue-cli 中的前缀目录
            // },
            // minify: false
        }),
        //如果需要拷贝静态资源，请使用下方配置
        new CopyRspackPlugin({patterns:[{from:"public", to:""}]}),
        new DefinePlugin({
            //关闭 vue3 的警告信息
            "__VUE_OPTIONS_API__": true,
            "__VUE_PROD_DEVTOOLS__": false,
            "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__": false
        }),
        {
            apply(compiler) {
                for (let i = 0; i < compiler.options.plugins?.length; i++) {
                    const plugin = compiler.options.plugins[i]
                    // 不显示进度条
                    if (plugin?.name === "ProgressPlugin") {
                        compiler.options.plugins[i] = { apply() { } }
                    }
                }
            }
        }
    ],
	module: {
		rules: [
			{ test: /\.vue$/, loader: "vue-loader", options: { experimentalInlineMatchResource: true }},
            { test: /\.less$/, loader: 'less-loader', type: 'css'},
            { test: /\.(txt|svg)/, type: "asset/resource" },
            { test: /\.md/, type: 'asset/source' }
		]
	}
}

module.exports = config
