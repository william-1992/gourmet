import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import cartDefault from '@assets/images/banner-cart.png'
import cartChecked from '@assets/images/banner-cart-checked.png'
import './index.less'

export default class GoodsList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { data, onChange } = this.props
    const API_HOSTNAME = process.env.API_HOSTNAME;
    return (    
      <View className='cart-list'>
        {data.length>0 && data.map(item => (
          <View className='cart-list-item'>
            <View className='cart-list-item-left'>
              <Image
                className='item-img'
                src={`${API_HOSTNAME}${item.goodsImg}`}
              />
              <View className='cart-list-item-title'>
                <View className='cart-list-item-title-h'>{item.goodsName}</View>
                <View className='cart-list-item-title-price'><Text className='unit'>¥</Text>{item.goodsPrice}</View>
              </View>
            </View>
            <View className='cart-list-item-right'>
              {item.status === '0' ? (
                <Image onClick={() => onChange(item)} className='item-cart' src={cartDefault}/>
              ) : (
                <Image onClick={() => onChange(item)} className='item-cart' src={cartChecked}/>
              )}
            </View>
          </View>
        ))}
      </View>
    )
  }
}