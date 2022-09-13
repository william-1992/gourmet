import Server from "./server";
let API_HOSTNAME = process.env.API_HOSTNAME;
class API extends Server {
  constructor() {
    super();
    this.axios = this.axios.bind(this);
  }

  // 获取openid
  async getOpenId(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
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
  // 下单 - 购物车
  async createCart(url, params = {}) {
    try {
      let result = await this.axios("post", `${API_HOSTNAME}${url}`, params);
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

  // 获取订单列表 - 订单
  // /weixin/order/orderGoodsInfo
  async getOrderList(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // 获取订单详情
  async getOrderDetail(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // 取消订单
  async getOrderCancel(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // /weixin/cart/add      加入购物车接口  参数：openid  goodsId
  // 加入购物车
  async getAddCartl(url, params = {}) {
    try {
      let result = await this.axios("post", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
  // weixin/cart/deleteGoods  get方法  openid goodsId
  // 购物车中删除该订单
  async getDelCartl(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }

  // 获取用户信息
  async getUserInfo(url, params = {}) {
    try {
      let result = await this.axios("get", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (error) {
      throw err;
    }
  }

  // 用户更新接口
  async updateUser(url, params = {}) {
    try {
      let result = await this.axios("post", `${API_HOSTNAME}${url}`, params);
      if (result) return result;
    } catch (error) {
      throw err;
    }
  }
}

export default new API();
