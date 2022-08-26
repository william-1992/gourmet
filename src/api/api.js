import Server from "./server";
import qs from "qs";
const { REACT_APP } = process.env;
class API extends Server {
  constructor() {
    super();
    this.axios = this.axios.bind(this);
  }

  // 首页banner
  async getAdvanceList(url, params = {}) {
    try {
      let result = await this.axios("get", url, params);
      if (result) return result;
    } catch (err) {
      throw err;
    }
  }
}

export default new API();
