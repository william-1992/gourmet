import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabBar } from 'taro-ui'
import IndexSwipper from '@components/swipper'
import GoodsList from '@components/goodsList'
import API from '@api/api'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '美食家'
  }

  constructor(props) {
    super(props)
    this.state = {
      tabCurrent: 0,
      tabId: '',
      value: '',
      list: [],
      menuList: [{
        title: '全部',
        id: ''
      }],
      goodsList: []
    }
  }

  componentDidMount () {
    this.getRotation()
    this.getMenuList()
  }

  onChange (value) {
    this.setState({
      value
    })
  }

  async getRotation() {
    let result = await API.getRotationList('/weixin/goods/rotationList')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 })
    this.setState({ list: result.data })
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 })
    const new_List = result.data.map(item => ({ title: item.menuName, id: item.id }))
    this.setState({ menuList: [ ...this.state.menuList, ...new_List], tabId: '' }, () => {
      this.getGoodsList('')
    })
  }

  async getGoodsList(id = '') {
    // if(!id) return
    let result = await API.getGoodsList(`/weixin/goods/goodslist`, { menuId: id })
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 })
    this.setState({ goodsList: result.data })
  }

  handleClick (value) {
    this.setState({ tabCurrent: value, tabId: this.state.menuList[value].id })
    this.getGoodsList(this.state.menuList[value].id)
  }
  toSearch = () => {
    Taro.navigateTo({
      url: '/pages/index/search'
    })
  }
  swiperCallBack = async (item) => {
    if(item.status === '1') {
      const result = await API.getDelCartl(`/weixin/cart/deleteGoods`, { goodsId: item.id })
      if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 })
      this.getRotation()
      this.getGoodsList(this.state.tabId)
      return Taro.showToast({ title: '取消加入购物车', duration: 2000 }) 
    }else {
      const result = await API.getAddCartl(`/weixin/cart/add`, {
        goodsId: item.id,
      })
      if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 })
      this.getRotation()
      this.getGoodsList(this.state.tabId)
      return Taro.showToast({ title: '成功加入购物车', duration: 2000 })
    }
  }

  render () {
    const { list, tabCurrent, menuList, goodsList } = this.state
    return (
      <View className='index-wrap'>
        <AtSearchBar
          value={this.state.value}
          onFocus={this.toSearch}
        />
        { list.length>0 && <IndexSwipper onChange={this.swiperCallBack} list={list} /> }
        <AtTabBar
          tabList={menuList}
          color='#D6D2CA'
          selectedColor='#FEC748'
          backgroundColor='#F5F5F5'
          onClick={this.handleClick.bind(this)}
          current={tabCurrent}
        />
        <GoodsList onChange={this.swiperCallBack}  data={goodsList} />
      </View>
    )
  }
}
