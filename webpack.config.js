"use strict";

// plugins
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const readConfig = require("read-config");

// paths
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8080;
const SRC = path.resolve(__dirname, "_src");
const ROOT = path.resolve(__dirname, ".");
const DEST_DIR = "/";

const devMode = process.env.NODE_ENV !== "production";

console.log("=================");
console.log(ROOT);
console.log(ROOT + DEST_DIR);
console.log("=================");

module.exports = {
  watch: true,
  mode: "development",
  devtool: "source-map",

  entry: {
    "js/original": `${SRC}/ts/original.ts`,
  },

  output: {
    // 生成したファイルの格納場所
    path: ROOT + DEST_DIR,
    // 生成するファイルネーム
    filename: "[name].js",
    // 本番ビルド時にCSSやHTMLファイル内のURL
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs)$/,
        loader: "ts-shader-loader",
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        options: {
          compact: true,
          cacheDirectory: true,
        },
      },

      {
        test: /\.ts?$/,
        loader: "awesome-typescript-loader",
      },

      {
        test: /\.scss$/,
        use: [
          // javascriptとしてバンドルせずcssとして出力する
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              minimize: true,
              importLoaders: 2, // Sass+PostCSSの場合は2を指定
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: [`${SRC}/scss`],
            },
          },
        ],
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              root: path.resolve(`${SRC}/pug/`),
              pretty: true,
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },

  // 拡張子省略時のpath解決
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".glsl"],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.css",
    }),
  ],
};
