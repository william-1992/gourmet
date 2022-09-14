import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import cartDefault from '@assets/images/banner-cart.png'
import cartChecked from '@assets/images/banner-cart-checked.png'
import './index.less'

const API_HOSTNAME = process.env.API_HOSTNAME;

export default class GoodsList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  openPreview = (item) => {
    Taro.previewImage({
      current: `${API_HOSTNAME}${item.goodsImg}`, // 当前显示图片的http链接
      urls: [`${API_HOSTNAME}${item.goodsImg}`], // 需要预览的图片http链接列表
    })
  }
  
  render() {
    const { data = [], onChange } = this.props
    return (    
      <View className='cart-list'>
        {data.length>0 && data.map(item => (
          <View className='cart-list-item'>
            <View className='cart-list-item-left'>
              <Image
                className='item-img'
                src={`${API_HOSTNAME}${item.goodsImg}`}
                onClick={this.openPreview.bind(this, item)}
              />
              <View className='cart-list-item-title'>
                <View className='cart-list-item-title-h'>{item.goodsName}</View>
                <View className='cart-list-item-title-price'><Text className='unit'>¥</Text>{item.goodsPrice}</View>
              </View>
            </View>
            <View className={`cart-list-item-right ${item.status === '1' ? '' : 'nocheck'}`}>
              {item.status === '1' ? (
                <Image onClick={() => onChange(item)} className='item-cart' src={cartChecked}/>
              ) : (
                <Image onClick={() => onChange(item)} className='item-cart' src={cartDefault}/>
              )}
            </View>
          </View>
        ))}
      </View>
    )
  }
}