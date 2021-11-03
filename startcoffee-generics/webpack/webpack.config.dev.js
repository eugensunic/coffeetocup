const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js"
  },

  devServer: {
    inline: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
      },
      "/login": {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
      },
      "/logout": {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
      },
      "/auth": {
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader?sourceMap=true", "sass-loader"]
      }
    ]
  }
});
