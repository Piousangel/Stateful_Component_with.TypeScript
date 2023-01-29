const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    devServer: {
        static: path.join(__dirname, "public"),
        compress: true,
        open: true,
        host: "localhost",
        port: 3000,
        historyApiFallback: true, // 새로고침시 api fallback
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss/i,
                use: [
                    "style-loader",
                    // css-loader 소스맵 옵션 활성화
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    // sass-loader 소스맵 옵션 활성화
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
        },
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".js", ".ts", ".json", ".scss"],
    },
    target: "web",
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "public/index.html"),
            inject: false,
        }),
    ],
};
