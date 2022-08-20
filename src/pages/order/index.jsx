import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.less'

export default class Order extends Component {

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
    navigationBarTitleText: '订单'
  }

  render () {
    return (
      <View className='index'>
        <Text>Order!</Text>
      </View>
    )
  }
}
