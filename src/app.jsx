import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'
import header from '@api/header';
import VConsole from 'vconsole';
import API from '@api/api'
import './app.less'

// const vConsole = new VConsole();
// or init with options
// const vConsole = new VConsole({ theme: 'dark' });

// remove it when you finish debugging
// vConsole.destroy();

let vConsole;
if(process.env.NODE_ENV === 'development') {
  vConsole = new VConsole({ theme: 'dark' });
  vConsole.destroy();
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// history 路由强制到 hash
// if (window &&window.location.pathname && window.location.pathname !== '/') {
//   const redirectPathhref = window.location.href
//     .replace(window.location.origin, '')
//     .replace(/#.*$/, '')
//   window.IN_HIS_ROUTER_JUMPING = true
//   window.location.replace('/#'+redirectPathhref)
// }

class App extends Component {

  componentDidMount () {
    this.init()
  }

  async init() {
    // 利用正则表达式
    let url =  window.location.search
    var params = this.queryURLParams(url)
    // openid: "121548a8a8a8a8"
    //如果为空则需要web认证
    if(!params){
      const result = await API.getOpenId('/weixin/oauth/config')
      if(result.data.data) return Taro.showToast({ title: result.msg, duration: 2000 })
      document.location.href = res.data.data
      // axios({
      //       method: 'get',//提交方法
      //       url: '/weixin/oauth/config',//提交地址
      //       params: {}
      //   }).then((res) => {
      //       document.location.href = res.data.data
      //   })
    }
    //以下为伪代码：
    var openid = params.openid;
    header.set({
      'openid': openid,
    });
    Taro.setStorage({
      key: "openId",
      data: openid
    })
    //所有ajxa请求都要有 加上参数 openid;  无论是新增  删除  更新 get post
  }

  // // 返回参数对象
  queryURLParams(url) {

    let pattern = /(\w+)=(\w+)/ig; //定义正则表达式

    let parames = {}; // 定义参数对象

    url.replace(pattern, ($, $1, $2) => {

        parames[$1] = $2;

    });

    return parames;

  }

  config = {
    enablePullDownRefresh: true,
    disableSwipeBack: false,
    pages: [
      'pages/index/index',
      'pages/index/search',
      'pages/cart/index',
      'pages/order/index',
      'pages/user/index',
      'pages/order/detailed',
      'pages/user/edit'
    ],
    tabBar: {
      color: 'rgba(214, 210, 202, 1)',
      selectedColor: 'rgba(29, 28, 26, 1)',
      backgroundColor: 'white',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/images/home.png',
        selectedIconPath: './assets/images/homeChecked.png',
      }, {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: './assets/images/cart.png',
        selectedIconPath: './assets/images/cartChecked.png',
      }, {
        pagePath: 'pages/order/index',
        text: '订单',
        iconPath: './assets/images/order.png',
        selectedIconPath: './assets/images/orderChecked.png',
      }, {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: './assets/images/user.png',
        selectedIconPath: './assets/images/userChecked.png',
      }]
    },
    window: {
      backgroundColor: '#D6D2CA',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
