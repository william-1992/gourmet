import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
// import './index.scss'

export default class Tabbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    }, () => {
      console.error('value', value, this.state)
    })
    switch (value) {
      case 0:
          Taro.redirectTo({
              url: `/pages/index/index`
          })
          break;
      case 1:
          Taro.redirectTo({
              url: `/pages/cart/index`
          })
          break;
      case 2:
          Taro.redirectTo({
              url: `/pages/order/index`
          })
          break;
      case 3:
          Taro.redirectTo({
              url: `/pages/user/index`
          })
          break;            
      default:
          break;
    }    
  }
  render() {
    return (    
      <View className='Mycenter'>
        <AtTabBar fixed tabList={[
            { title: '首页', iconType: 'home'},
            { title: '购物车', iconType: 'message' },
            { title: '订单', iconType: 'folder'},
            { title: '我的', iconType: 'user'}
          ]}
          color='#D6D2CA'
          selectedColor='#1D1C1A'
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}