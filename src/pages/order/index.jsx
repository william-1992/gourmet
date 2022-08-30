import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem, AtButton, AtDivider } from 'taro-ui'
import API from '@api/api'
import cancel from '@assets/images/cancel.png'
import cancel2 from '@assets/images/cancel2.png'
import orders from '@assets/images/orders.png'
import pricel from '@assets/images/pricel.png'

import './index.less'
import { async } from 'regenerator-runtime'

export default class Order extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orderList: []
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getOrderList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '订单'
  }

  getOrderList = async () => {
    const result = await API.getOrderList('/weixin/order/orderList?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M')
    if(result.code !== 200) return <AtToast isOpened text={result.msg}></AtToast>
    this.setState({ orderList: result.data })
  }

  toRouter = (item) => {
    Taro.navigateTo({
      url: `/pages/order/detailed?id=${item.orderNo}`
    })
  }

  orderCancel = async (item) => {
    const result = await API.getOrderCancel(`weixin/order/cancelOrders/${item.id}?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M `)
    if(result.code !== 200) return <AtToast isOpened text={result.msg}></AtToast>
    this.getOrderList()
    return <AtToast isOpened text='已取消该订单'></AtToast>
  }

  render () {
    // 订单状态:0已下单1已接单 2客户取消 3商家取消 4订单完成
    const { orderList } = this.state
    return (
      <View className='order-wrap'>
        <View className='order-wrap-header'>共计<Text>{orderList.length || 0}</Text>订单</View>
        { orderList.length>0 && orderList.map(item => (
          <AtList className={`${ item.orderStatus === 2 ? 'cancel-item' : item.orderStatus === 1 ? 'down-item' : '' }`}>
            <AtListItem title='商品' extraText={`${item.orderNum}个`} />
            <AtListItem title='收货人' extraText={item.userName} />
            <AtListItem title='电话' extraText={item.phone} />
            <AtListItem title='地址' extraText={item.address} />
            <AtDivider />
            <AtListItem title='下单日期' extraText={item.createDate} />
            <AtListItem title='订单编号' extraText={item.id} />
            <AtDivider className='foot-divider' />
            <View className='item-foot'>
              { item.orderStatus === 2 ? (
                <AtButton><Image className='item-img' src={cancel2} />已取消</AtButton>
              ) : item.orderStatus === 1 ? (
                <AtButton onClick={this.orderCancel.bind(this, item)} className='red'><Image className='item-img' src={orders} />已接单</AtButton>
              ) : (
                <AtButton onClick={this.orderCancel.bind(this, item)}><Image className='item-img' src={cancel} />取消</AtButton>
              )}
              <AtButton onClick={this.toRouter.bind(this, item)} className='yellow'>
                <Image className='item-img' src={pricel} />
                明细
              </AtButton>
            </View>
          </AtList>
        )) }
        {/* <AtList className='cancel-item'>
          <AtListItem title='商品' extraText='1个' />
          <AtListItem title='收货人' extraText='美食家' />
          <AtListItem title='电话' extraText='13012341234' />
          <AtListItem title='地址' extraText='成都市青羊区时代印象' />
          <AtDivider />
          <AtListItem title='下单日期' extraText='2020/08/04 15:22' />
          <AtListItem title='订单编号' extraText='34528907520' />
          <AtDivider className='foot-divider' />
          <View className='item-foot'>
            <AtButton><Image className='item-img' src={cancel2} />已取消</AtButton>
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
        </AtList> */}
      </View>
    )
  }
}
