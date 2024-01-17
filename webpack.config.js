// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        // plugins: [new BundleAnalyzerPlugin()],

        target: ['web', 'es5'],
        optimization: {
            // 代码压缩
            minimize: true
        },
        module: {
            rules: [
                {
                    // 万物皆模块 在解析js模块时先交给 use中的loader处理
                    test: /\.js$/,
                    // 不会处理我们的第三方库代码
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: require('./babel.config')
                    }
                },
                {
                    test: /\.dataurl$/,
                    use: 'raw-loader'
                }
            ]
        },
    }
} else {
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.dataurl$/,
                    use: {
                        loader:'raw-loader'
                    }
                }
            ]
        }
    }
}
