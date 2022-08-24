import Taro, { Component } from '@tarojs/taro'
import { View, Text, Radio, Image } from '@tarojs/components'
import { AtIcon, AtTag, AtButton } from 'taro-ui'
import CartList from '@components/cartList'
import './index.less'

export default class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '购物车'
  }

  render () {
    return (
      <View className='cart-wrap'>
        <CartList />
        <View className='cart-footer'>
          <Radio color='#FEC748' value='选中' checked>全选</Radio>
          <AtButton size='small' type='primary' circle>下单</AtButton>
        </View>
      </View>
    )
  }
}
