import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CartList from '@components/cartList'
import './index.less'

export default class Detailed extends Component {

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
    navigationBarTitleText: '明细'
  }

  render () {
    return (
      <View className='detailed-wrap'>
        <View className='noticebar'>
          <View>订单明细/订单编号<Text>34528907520</Text></View>
          <View>共计<Text className='red'>304</Text>商品</View>
        </View>
        <CartList type='detailed' />
      </View>
    )
  }
}
