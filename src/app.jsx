import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/cart/index',
      'pages/order/index',
      'pages/user/index',
      'pages/order/detailed'
      
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
