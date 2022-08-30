import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtTabBar, AtList, AtListItem } from 'taro-ui'
import bannerImg from '@assets/images/banner.png'
import IndexSwipper from '@components/swipper'
import GoodsList from '@components/goodsList'
import API from '@api/api'
import './index.less'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tabCurrent: 0,
      tabId: null,
      value: '',
      list: [],
      menuList: [],
      goodsList: []
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getRotation()
    this.getMenuList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value
    })
  }

  async getRotation() {
    let result = await API.getRotationList('/weixin/goods/rotationList?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M ')
    if(result.code !== 200) return <AtToast isOpened text={result.msg}></AtToast>
    this.setState({ list: result.data })
  }

  async getMenuList() {
    let result = await API.getMenuList('/weixin/menu/menuList?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M ')
    if(result.code !== 200) return <AtToast isOpened text={result.msg}></AtToast>
    const new_List = result.data.map(item => ({ title: item.menuName, id: item.id }))
    this.setState({ menuList: new_List, tabId: new_List[0].id }, () => {
      this.getGoodsList(this.state.tabId)
    })
  }

  async getGoodsList(id) {
    if(!id) return
    let result = await API.getGoodsList(`/weixin/goods/goodslist?menu_id=${id}&openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M`)
    if(result.code !== 200) return <AtToast isOpened text={result.msg}></AtToast>
    this.setState({ goodsList: result.data })
  }

  config = {
    navigationBarTitleText: '美食家'
  }
  handleClick (value) {
    this.setState({
      tabCurrent: value
    })
    this.getGoodsList(this.state.menuList[value].id)
  }
  toSearch = () => {
    Taro.navigateTo({
      url: '/pages/index/search'
    })
  }

  render () {
    const { list, tabCurrent, menuList, goodsList } = this.state
    return (
      <View className='index-wrap'>
        <AtSearchBar
          value={this.state.value}
          onFocus={this.toSearch}
        />
        { list.length>0 && <IndexSwipper list={list} /> }
        <AtTabBar
          tabList={menuList}
          color='#D6D2CA'
          selectedColor='#FEC748'
          backgroundColor='#F5F5F5'
          onClick={this.handleClick.bind(this)}
          current={tabCurrent}
        />
        <GoodsList data={goodsList} />
      </View>
    )
  }
}
