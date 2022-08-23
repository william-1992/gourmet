import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem, AtButton, AtDivider } from 'taro-ui'
import cancel from '@assets/images/cancel.png'
import cancel2 from '@assets/images/cancel2.png'
import pricel from '@assets/images/pricel.png'

import './index.less'

export default class Order extends Component {

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
    navigationBarTitleText: '订单'
  }

  render () {
    return (
      <View className='order-wrap'>
        <View className='order-wrap-header'>共计<Text>304</Text>订单</View>
        <AtList>
          <AtListItem title='商品' extraText='1个' />
          <AtListItem title='收货人' extraText='美食家' />
          <AtListItem title='电话' extraText='13012341234' />
          <AtListItem title='地址' extraText='成都市青羊区时代印象' />
          <AtDivider />
          <AtListItem title='下单日期' extraText='2020/08/04 15:22' />
          <AtListItem title='订单编号' extraText='34528907520' />
          <AtDivider className='foot-divider' />
          <View className='item-foot'>
            <AtButton><Image className='item-img' src={cancel} />取消</AtButton>
            <AtButton className='yellow'><Image className='item-img' src={pricel} />明细</AtButton>
          </View>
        </AtList>
        <AtList className='cancel-item'>
          <AtListItem title='商品' extraText='1个' />
          <AtListItem title='收货人' extraText='美食家' />
          <AtListItem title='电话' extraText='13012341234' />
          <AtListItem title='地址' extraText='成都市青羊区时代印象' />
          <AtDivider />
          <AtListItem title='下单日期' extraText='2020/08/04 15:22' />
          <AtListItem title='订单编号' extraText='34528907520' />
          <AtDivider className='foot-divider' />
          <View className='item-foot'>
            <AtButton><Image className='item-img' src={cancel2} />取消</AtButton>
            <AtButton className='yellow'><Image className='item-img' src={pricel} />明细</AtButton>
          </View>
        </AtList>
        <AtList className='down-item'>
          <AtListItem title='商品' extraText='1个' />
          <AtListItem title='收货人' extraText='美食家' />
          <AtListItem title='电话' extraText='13012341234' />
          <AtListItem title='地址' extraText='成都市青羊区时代印象' />
          <AtDivider />
          <AtListItem title='下单日期' extraText='2020/08/04 15:22' />
          <AtListItem title='订单编号' extraText='34528907520' />
          <AtDivider className='foot-divider' />
          <View className='item-foot'>
            <AtButton className='red'><Image className='item-img' src={cancel} />已接单</AtButton>
            <AtButton className='yellow'><Image className='item-img' src={pricel} />明细</AtButton>
          </View>
        </AtList>
      </View>
    )
  }
}
