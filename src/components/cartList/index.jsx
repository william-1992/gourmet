import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Radio } from '@tarojs/components'
import { AtIcon, AtTag } from 'taro-ui'
import cartlist from '@assets/images/cartlist.png'
import './index.less'

export default class CartList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { type } = this.props
    return (    
      <View className='order-list'>
        <View className='list-item'>
          <View className='list-item-top'>
            <Text className='list-item-top-data'>添加日期：<Text>2022/08/04</Text></Text>
            {type!=='detailed' && <AtIcon value='trash' size='18' color='rgba(112, 112, 112, 1)'></AtIcon>}
          </View>
          <View className='list-item-content'>
            {type!=='detailed' && <Radio value='选中' checked></Radio> } 
            <Image className='item-img' src={cartlist} />
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
    )
  }
}