import { omit } from "lodash";
import Taro from "@tarojs/taro";

const header = {
  config: {
    "Content-Type": "application/json",
    ...Taro.getStorageSync("@RCC/QUREY_BASE")
  },
  get() {
    return this.config;
  },
  set(obj) {
    this.config = { ...this.config, ...obj };
  },
  omit(arr = []) {
    this.config = omit(this.config, arr);
  }
};

export default header;
