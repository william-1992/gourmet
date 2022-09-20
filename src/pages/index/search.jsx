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
      menuList: [],
      goodsList: []
    }
  }


  componentDidMount() {
    this.getMenuList()
  }

  config = {
    navigationBarTitleText: '搜索'
  }

  async onChange (value) {
    const result = await API.getGoodsList(`/weixin/goods/goodslist`, {
      goodsName: value,
      menuId: this.state.tabId,
    })
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.setState({ goodsList: result.data, searchValue: value })
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    const new_List = result.data.map(item => ({ title: item.menuName, id: item.id }))
    const filstMenu = [{ title: '全部', id: '' }]
    this.setState({ menuList: [ ...filstMenu, ...new_List], tabId: '' }, () => {
      this.getGoodsList('')
    })
  }

  async getGoodsList(id) {
    // if(!id) return
    let result = await API.getGoodsList(`/weixin/goods/goodslist`, {
      goodsName: this.state.searchValue,
      menuId: id,
    })
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.setState({ goodsList: result.data })
  }

  handleClick (value) {
    this.setState({ tabCurrent: value, tabId: this.state.menuList[value].id })
    this.getGoodsList(this.state.menuList[value].id)
  }

  swiperCallBack = async (item) => {
    if(item.status === '1') {
      const result = await API.getDelCartl(`/weixin/cart/deleteGoods`, {
        goodsId: item.id,
      })
      if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
      this.getRotation()
      return Taro.showToast({ title: '取消加入购物车', duration: 2000 });
    }else {
      const result = await API.getAddCartl(`/weixin/cart/add`, {
        goodsId: item.id,
      })
      if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
      this.getRotation()
      return Taro.showToast({ title: '成功加入购物车', duration: 2000 });
    }
  }

  render () {
    const { list, tabCurrent, menuList, goodsList, searchValue } = this.state
    return (
      <View className='index-wrap'>
        <AtSearchBar
          focus
          value={this.state.searchValue}
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
