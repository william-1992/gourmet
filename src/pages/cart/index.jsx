import Taro, { Component } from '@tarojs/taro'
import { View, Text, Radio, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import API from '@api/api'
import CartList from '@components/cartList'
import empty from '@assets/images/empty.png'
import './index.less'

Taro.startPullDownRefresh()
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
    Taro.startPullDownRefresh()
    this.getMenuList()
  }

  componentDidShow() {
    this.getCartList()
  }

  config = {
    navigationBarTitleText: '购物车'
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.setState({ menuList: result.data })
  }

  async getCartList() {
    let result = await API.getCartList('/weixin/goods/queryCartGoodsInfo')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
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
    const goodsIds = []
    list.forEach(item => {
      if(item.checked) goodsIds.push(item.id) 
    })
    const result = await API.createCart(`/weixin/order/creatOrder`, {
      goodsIds,
    })
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.getCartList()
    return Taro.showToast({ title: '下单成功', duration: 2000 });
  }

  render () {
    const { allChecked, list, menuList } = this.state;
    const isPlace = list.some(item => item.checked === true)
    const checkList = list.filter(item => item.checked)
    return (
      <View className='cart-wrap'>
        { list.length > 0 ? (
          <CartList list={list} menuList={menuList} isAll={allChecked} callBack={this.radioHandle} />
        ) : (
          <View className='empty-wrap'>
            <Image src={empty} />
          </View>
        ) }
        
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
