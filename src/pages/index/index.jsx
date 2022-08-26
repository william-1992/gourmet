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
      value: '',
      list: [{
        url: bannerImg,
        title: '蔬菜小沙拉',
        price: 20,
        state: 0
      }, {
        url: bannerImg,
        title: '蔬菜小沙拉',
        price: 40,
        state: 1
      }, {
        url: bannerImg,
        title: '蔬菜小沙拉',
        price: 60,
        state: 0
      }]
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getBanner()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value
    })
  }

  async getBanner() {
    let result = await API.getAdvanceList('/api/list')
    console.error('result', result)
  }

  config = {
    navigationBarTitleText: '美食家'
  }
  handleClick (value) {
    this.setState({
      tabCurrent: value
    })
  }
  toSearch = () => {
    Taro.navigateTo({
      url: '/pages/index/search'
    })
  }

  render () {
    const { list, tabCurrent } = this.state
    return (
      <View className='index-wrap'>
        <AtSearchBar
          value={this.state.value}
          onFocus={this.toSearch}
        />
        <IndexSwipper list={list} />
        <AtTabBar
          tabList={[
            { title: '全部' },
            { title: '早餐' },
            { title: '午餐' },
            { title: '下午茶' },
            { title: '晚餐' },
            { title: '夜宵' },
          ]}
          color='#D6D2CA'
          selectedColor='#FEC748'
          backgroundColor='#F5F5F5'
          onClick={this.handleClick.bind(this)}
          current={tabCurrent}
        />
        <GoodsList />
      </View>
    )
  }
}
