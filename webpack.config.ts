import path from "path";
import webpack from "webpack";

const config : webpack.Configuration = {
    entry: "./src/script.ts",
    devtool: "eval-source-map",
    mode: "development",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test:  /\.([cm]?ts)$/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}  

export default config;