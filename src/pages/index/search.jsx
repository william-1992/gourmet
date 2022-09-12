import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtTabBar, AtList, AtListItem } from 'taro-ui'
import bannerImg from '@assets/images/banner.png'
import IndexSwipper from '@components/swipper'
import GoodsList from '@components/goodsList'
import API from '@api/api'
import qs from "qs";
import './index.less'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabId: '',
      tabCurrent: 0,
      searchValue: '',
      list: [],
      menuList: [{
        title: '全部',
        id: ''
      }],
      goodsList: []
    }
  }

  async onChange (value) {
    // weixin/goods/goodslist  get
    // goodsName
    this.setState({ value })
    const result = await API.getGoodsList(`/weixin/goods/goodslist?${qs.stringify({
      goodsName: value,
      menu_id: this.state.tabId,
      openid: 'o6_bmjrPTIm6_2sgVt7hMZOPfL2M'
    })}`)
    this.setState({ goodsList: result.data })
  }

  componentDidMount() {
    this.getMenuList()
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M ')
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    const new_List = result.data.map(item => ({ title: item.menuName, id: item.id }))
    this.setState({ menuList: [ ...this.state.menuList, ...new_List], tabId: new_List[0].id }, () => {
      this.getGoodsList('')
    })
  }

  async getGoodsList(id) {
    // if(!id) return
    let result = await API.getGoodsList(`/weixin/goods/goodslist?${qs.stringify({
      goodsName: this.state.searchValue,
      menu_id: id,
      openid: 'o6_bmjrPTIm6_2sgVt7hMZOPfL2M'
    })}`)
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    this.setState({ goodsList: result.data })
  }

  handleClick (value) {
    this.setState({ tabCurrent: value })
    this.getGoodsList(this.state.menuList[value].id)
  }

  swiperCallBack = async (item) => {
    if(item.status === '1') {
      const result = await API.getDelCartl(`/weixin/cart/deleteGoods?goodsId=${item.id}&openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M`)
      if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
      this.getRotation()
      return Taro.atMessage({ 'message': '取消该订单', 'type': 'success' })
    }else {
      const result = await API.getAddCartl(`/weixin/cart/add`, {
        goodsId: item.id,
        openid: 'o6_bmjrPTIm6_2sgVt7hMZOPfL2M'
      })
      if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
      this.getRotation()
      return Taro.atMessage({ 'message': '成功加入购物车', 'type': 'success' })
    }
  }

  render () {
    const { list, tabCurrent, menuList, goodsList } = this.state
    return (
      <View className='index-wrap'>
        <AtSearchBar
          focus
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <AtTabBar
          tabList={menuList}
          color='#D6D2CA'
          selectedColor='#FEC748'
          backgroundColor='#F5F5F5'
          onClick={this.handleClick.bind(this)}
          current={tabCurrent}
        />
        <GoodsList onChange={this.swiperCallBack}  data={goodsList}  />
      </View>
    )
  }
}
