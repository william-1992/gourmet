import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value
    })
  }

  config = {
    navigationBarTitleText: '美食家'
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='demo-text-1'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
