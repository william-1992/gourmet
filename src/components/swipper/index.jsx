import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem } from '@tarojs/components'
import cartDefault from '@assets/images/banner-cart.png'
import cartChecked from '@assets/images/banner-cart-checked.png'

export default  class IndexSwipper extends PureComponent {

  render () {
    const { list } = this.props
    return (
      <Swiper
        className='test-h'
        displayMultipleItems={1.3}
      >
        {list.length>0 && list.map(item => (
          <SwiperItem>
            <View className='item'>
              <View className='item-img'>
                <Image
                  className='item-img-banner'
                  src={item.url}
                />
                <Image className='item-img-cart' src={cartDefault} />
              </View>
              <View className='item-text'>
                <Text className='item-text-title'>{ item.title }</Text>
                <Text className='item-text-price'><Text className='unit'>¥</Text>{ item.price }</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}