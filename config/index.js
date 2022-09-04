const path = require("path");

const config = {
  projectName: "gourmet",
  date: "2022-8-15",
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2
  },
  alias: {
    "@assets": path.resolve(__dirname, "..", "src/assets"),
    "@components": path.resolve(__dirname, "..", "src/components"),
    "@api": path.resolve(__dirname, "..", "src/api")
  },
  sourceRoot: "src",
  outputRoot: "dist",
  babel: {
    sourceMap: true,
    presets: [
      [
        "env",
        {
          modules: false
        }
      ]
    ],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread",
      [
        "transform-runtime",
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: "babel-runtime"
        }
      ]
    ]
  },
  plugins: [
    "@tarojs/plugin-less",
    "@tarojs/plugin-sass",
    "@tarojs/plugin-uglify"
  ],
  defineConstants: {},
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "./",
    staticDirectory: "static",
    esnextModules: ["taro-ui"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
    // webpackChain(chain, webpack) {
    //   chain.merge({
    //     module: {
    //       rule: {
    //         myloader: {
    //           test: /\.js$/,
    //           use: [
    //             {
    //               loader: "babel-loader",
    //               options: {}
    //             }
    //           ]
    //         }
    //       }
    //     }
    //   });
    // },
    // publicPath: process.env.NODE_ENV === "development" ? "/" : "./"
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
