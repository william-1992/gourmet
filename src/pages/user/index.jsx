import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.less'

export default class User extends Component {

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
    navigationBarTitleText: '我的'
  }

  render () {
    return (
      <View className='index'>
        <Text>me!</Text>
      </View>
    )
  }
}
