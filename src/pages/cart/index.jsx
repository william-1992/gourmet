import Taro, { Component } from '@tarojs/taro'
import { View, Text, Radio, Image } from '@tarojs/components'
import { AtIcon, AtTag, AtButton, AtToast, AtMessage } from 'taro-ui'
import API from '@api/api'
import qs from "qs";
import CartList from '@components/cartList'
import './index.less'

export default class Cart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuList: [],
      list: [],
      allChecked: false,
    }
  }

  componentDidMount () {
    this.getMenuList()
    this.getCartList()
  }

  config = {
    navigationBarTitleText: '购物车'
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M ')
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    this.setState({ menuList: result.data })
  }

  async getCartList() {
    let result = await API.getCartList('/weixin/goods/queryCartGoodsInfo?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M ')
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    const new_list = result.data.map(item => ({ ...item, checked: false }))
    this.setState({ list: new_list })
  }
  // callback
  radioHandle = (type, row) => {
    const { list } = this.state;
    if(type === 'checked') {
      const new_data = list.map(item => {
        if(item.id === row.id) {
          return { ...item, checked: !item.checked }
        }else {
          return item
        }
      })
      this.setState({ list: new_data }, () => {
        this.filterListChecked()
      })
    }else {
      this.getCartList()
    }
  }

  filterListChecked() {
    const {list} = this.state
    const allChecked = list.every(item => item.checked === true)
    this.setState({ allChecked })
  }

  radioChange = (e) => {
    const { allChecked, list } = this.state;
    const new_data = list.map(item => ({ ...item, checked: !allChecked }))
    this.setState({ allChecked: !allChecked, list: new_data })
  }

  placeOrder = async () => {
    const { list } = this.state
    const ids = list.map(item => item.checked && item.id)
    const result = await API.createCart(`/weixin/order/creatOrder`, {
      goodsIds: ids,
      openid: process.env.OPEN_ID
    })
    if(result.code !== 200) return <AtToast isOpened text={result.msg}></AtToast>
    this.getCartList()
    return Taro.atMessage({ 'message': '下单成功', 'type': 'success' })
  }

  render () {
    const { allChecked, list, menuList } = this.state;
    const isPlace = list.some(item => item.checked === true)
    const checkList = list.filter(item => item.checked)
    return (
      <View className='cart-wrap'>
        <AtMessage />
        <CartList list={list} menuList={menuList} isAll={allChecked} callBack={this.radioHandle} />
        <View className='cart-footer'>
          <Radio 
            color='#FEC748' 
            value='选中' 
            checked={allChecked} 
            onChange={this.radioChange}
          >全选</Radio>
          <View className='cart-footer-right'>
            <Text>共计商品<Text className='red'>{checkList.length || 0}</Text>件</Text>
            <AtButton 
              disabled={ (isPlace || allChecked) ? false : true } 
              size='small' 
              type='primary' 
              circle
              onClick={this.placeOrder.bind(this)}
            >下单</AtButton>
          </View>
          
        </View>
      </View>
    )
  }
}
