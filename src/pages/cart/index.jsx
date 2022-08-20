import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.less'

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
      <View className='index'>
        <Text>Cart!</Text>
      </View>
    )
  }
}
