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
      list: [],
      menuList: []
    }
  }
  // $instance = getCurrentInstance()
  componentWillMount () { }

  componentDidMount () {
    this.getMenuList()
    const { id } = this.$router.params;
    this.getOrderDetail(id)
  }

  componentDidUpdate(prevProps, prevState) {
    // console.error('router', Taro.getCurrentInstance().router.params)
    // console.error('prevProps', prevProps, this.props)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '明细'
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M ')
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    this.setState({ menuList: result.data })
  }

  getOrderDetail = async (id) => {
    const result = await API.getOrderDetail(`/weixin/order/orderGoodsInfo?id=${id}&openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M`)
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    this.setState({ list: result.data })
  }

  render () {
    const { list = [], menuList = [] } = this.state
    return (
      <View className='detailed-wrap'>
        <AtMessage />
        <View className='noticebar'>
          <View>订单明细/订单编号<Text>34528907520</Text></View>
          <View>共计<Text className='red'>304</Text>商品</View>
        </View>
        <CartList list={list} menuList={menuList} type='detailed' />
      </View>
    )
  }
}
