import Taro, { Component } from '@tarojs/taro'
import { View, Text, Radio, Image } from '@tarojs/components'
import { AtIcon, AtTag, AtButton } from 'taro-ui'
import cartlist from '@assets/images/cartlist.png'
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
        <View className='list'>
          <View className='list-item'>
            <View className='list-item-top'>
              <Text className='list-item-top-data'>添加日期：<Text>2022/08/04</Text></Text>
              <AtIcon value='trash' size='18' color='rgba(112, 112, 112, 1)'></AtIcon>
            </View>
            <View className='list-item-content'>
              <Radio value='选中' checked></Radio>  
              <Image
                className='item-img'
                src={cartlist}
              />
              <View className='list-item-content-text'>
                <View className='list-item-content-text-title'>
                  <View className='title-h'>西红柿炖牛腩</View>
                  <AtTag size='small'>晚餐</AtTag>
                </View>
                <Text className='price'><Text className='unit'>¥</Text>66</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='cart-footer'>
          <Radio color='#FEC748' value='选中' checked>全选</Radio>
          <AtButton size='small' type='primary' circle>下单</AtButton>
        </View>
      </View>
    )
  }
}
