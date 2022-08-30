import Server from "./server";
import qs from "qs";
let API_HOSTNAME = process.env.API_HOSTNAME;
class API extends Server {
  constructor() {
    super();
    this.axios = this.axios.bind(this);
  }

  // 首页banner - 首页
  async getRotationList(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // 获取menu - 首页
  async getMenuList(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // 获取菜品 - 首页
  async getGoodsList(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }

  // 获取购物车列表 - 购物车
  async getCartList(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // /weixin/cart/deleteGoods/{ids}
  async delCart(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
}

export default new API();
