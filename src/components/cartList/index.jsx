import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import cartlist from '@assets/images/cartlist.png'
import cartChecked from '@assets/images/banner-cart-checked.png'
import './index.less'

export default class CartList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (    
      <View className='cart-list'>
        <View className='cart-list-item'>
          <View className='cart-list-item-left'>
            <Image
              className='item-img'
              src={cartlist}
            />
            <View className='cart-list-item-title'>
              <View className='cart-list-item-title-h'>重庆麻辣鸳鸯火锅</View>
              <View className='cart-list-item-title-price'><Text className='unit'>¥</Text>256</View>
            </View>
          </View>
          <View className='cart-list-item-right'>
            <Image
              className='item-cart'
              src={cartChecked}
            />
          </View>
        </View>
      </View>
    )
  }
}