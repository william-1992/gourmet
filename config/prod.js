/* eslint-disable import/no-commonjs*/
const _ = require("lodash");
const envs = require("./env");

const stringifyEnvs = {};
_.forEach(envs, (v, k) => {
  stringifyEnvs[k] = JSON.stringify(v);
});

module.exports = {
  env: {
    NODE_ENV: '"production"',
    ...stringifyEnvs
  },
  defineConstants: {},
  weapp: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
};
