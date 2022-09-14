import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// 引入 Swiper, SwiperItem 组件
import { Swiper, SwiperItem } from '@tarojs/components'
import cartDefault from '@assets/images/shopcart.png'
import cartChecked from '@assets/images/shopcart_ligh.png'

const API_HOSTNAME = process.env.API_HOSTNAME;

export default  class IndexSwipper extends PureComponent {

  openPreview = (item) => {
    Taro.previewImage({
      current: `${API_HOSTNAME}${item.goodsImg}`, // 当前显示图片的http链接
      urls: [`${API_HOSTNAME}${item.goodsImg}`], // 需要预览的图片http链接列表
    })
  }
  
  render () {
    const { list, onChange } = this.props
    return (
      <Swiper
        current={0}
        className='swipper-wrap'
        displayMultipleItems={1.3}
        circular
      >
        {list.length>0 && list.map(item => (
          <SwiperItem key={item.id}>
            <View className='item'>
              <View className='item-img'>
                <Image
                  className='item-img-banner'
                  src={`${API_HOSTNAME}${item.goodsImg}`}
                  onClick={this.openPreview.bind(this, item)}
                />
                { item.status === '1' ? (
                  <Image onClick={() => onChange(item)} className='item-img-cart item-img-cart-ligh' src={cartChecked} />
                ) : (
                  <Image onClick={() => onChange(item)} className='item-img-cart' src={cartDefault} />
                )}
              </View>
              <View className='item-text'>
                <Text className='item-text-title'>{ item.goodsName }</Text>
                <Text className='item-text-price'><Text className='unit'>¥</Text>{ item.goodsPrice }</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}