/* eslint-disable import/no-commonjs*/
const _ = require("lodash");
const envs = require("./env-local");

const stringifyEnvs = {};
_.forEach(envs, (v, k) => {
  stringifyEnvs[k] = JSON.stringify(v);
});

module.exports = {
  env: {
    NODE_ENV: '"development"',
    ...stringifyEnvs
  },
  defineConstants: {},
  weapp: {},
  h5: {}
};
