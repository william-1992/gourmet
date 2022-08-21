import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtTabBar, AtList, AtListItem } from 'taro-ui'
import bannerImg from '@assets/images/banner.png'
import IndexSwipper from '@components/swipper'
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

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value
    })
  }

  config = {
    navigationBarTitleText: '美食家'
  }
  handleClick (value) {
    console.error('value', value)
    this.setState({
      tabCurrent: value
    })
  }

  render () {
    const { list, tabCurrent } = this.state
    return (
      <View className='index-wrap'>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
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
        <AtList>
          <AtListItem
            title='标题文字'
            note='描述信息'
            extraText={<Text>详细信息11</Text>}
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem
            title='标题文字'
            note='描述信息'
            extraText='详细信息'
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem
            title='标题文字'
            note='描述信息'
            extraText='详细信息'
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
          <AtListItem
            title='标题文字'
            note='描述信息'
            extraText='详细信息'
            arrow='right'
            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          />
        </AtList>
      </View>
    )
  }
}
