import axios from "axios";
import { debounce, isNil } from "lodash";
import qs from "qs";
import { AtMessage } from "taro-ui";

const { REACT_APP_LOCAL, REACT_APP_API_HOSTNAME } = process.env;

const taostErrDebounce = debounce(
  msg => {
    Taro.atMessage({
      message: msg,
      type: "error"
    });
  },
  600,
  { leading: true, trailing: false }
);

if (REACT_APP_LOCAL) {
  axios.interceptors.request.use(
    config => {
      console.log(`http: <-- ${config.url}`, config.data);
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    dd => {
      const { config, data } = dd;
      console.log(`http: --> ${config.url}`, data);
      return dd;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

axios.defaults.withCredentials = true;

/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */

export default class Server {
  axios(method, url, params, others = {}, useOrigin = false) {
    return new Promise((resolve, reject) => {
      if (typeof params !== "object" || isNil(params)) params = {};
      let _option = params;
      _option = {
        method,
        url,
        baseURL: REACT_APP_API_HOSTNAME,
        timeout: 6 * 1e3,
        params: null,
        headers: null,
        // withCredentials: true, //是否携带cookies发起请求
        data: params,
        ...others
        // validateStatus:(status)=>{
        //     return status >= 200 && status < 300;
        // },
        // ...params,
      };
      axios.request(_option).then(
        res => {
          const dataWrap =
            typeof res.data === "object" || typeof res.data === "string"
              ? res.data
              : JSON.parse(res.data);
          if (dataWrap.errCode === "800001") {
            taostErrDebounce("请先登录");
            window.location.href = `${
              process.env.REACT_APP_LOGIN_PAGE_ADDRESS
            }?${qs.stringify({
              redirect_uri: window.location.href
            })}`;
            return;
          }
          // 之前写法有问题，内容太多保持原有， try catch 用法太乱
          resolve(useOrigin ? res : dataWrap);
        },
        error => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}
