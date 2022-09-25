import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CartList from '@components/cartList'
import { AtMessage } from 'taro-ui'
import API from '@api/api'
import './index.less'

export default class Detailed extends Component {

  constructor(props) {
    super(props)
    this.state = {
      detailId: '',
      list: [],
      menuList: []
    }
  }

  componentDidMount () {
    this.getMenuList()
    const { id } = this.$router.params;
    this.getOrderDetail(id)
  }

  componentDidUpdate(prevProps, prevState) {
    // console.error('router', Taro.getCurrentInstance().router.params)
    // console.error('prevProps', prevProps, this.props)
  }

  config = {
    navigationBarTitleText: '明细'
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.setState({ menuList: result.data })
  }

  getOrderDetail = async (orderNo) => {
    const result = await API.getOrderDetail(`/weixin/order/orderGoodsInfo`, { orderNo })
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.setState({ list: result.data, detailId: orderNo })
  }

  render () {
    const { list = [], menuList = [], detailId } = this.state
    let allPrice = 0
    list.forEach(item => {
      allPrice= allPrice + (item.goodsPrice || 0)
    })
    return (
      <View className='detailed-wrap'>
        <AtMessage />
        <View className='noticebar'>
          <View>订单明细/订单编号<Text>{ detailId }</Text></View>
          {/* <View>共计<Text className='red'>{ list.length }</Text>商品</View> */}
        </View>
        <View className='detailed-info'>
          <Text>共计<Text className='red'>{ list.length }</Text>商品</Text>
          <Text>¥<Text className='red'>{allPrice}</Text>元</Text>
        </View>
        <CartList list={list} menuList={menuList} type='detailed' />
      </View>
    )
  }
}
