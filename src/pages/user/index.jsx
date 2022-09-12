import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import avatar from '@assets/images/avatar.png'
import edit from '@assets/images/icon_edit.png'
import { AtList, AtListItem } from 'taro-ui'
import './index.less'

export default class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  config = {
    navigationBarTitleText: '我的'
  }

  componentDidMount() {
    // weixin/user/userInfo?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M
    // get
  }

  toEdit = () => {
    Taro.navigateTo({
      url: '/pages/user/edit'
    })
  }

  callPhone = () => {
    window.location.href = 'tel:13970029205'
  }

  render () {
    return (
      <View className='user-wrap'>
        <View className='user-content'>
          <View className='user-top'>
            <Image src={avatar}></Image>
            <Text>美食家店家<Image onClick={this.toEdit} src={edit}></Image></Text>
          </View>
          <AtList>
            <AtListItem title='收货姓名' extraText='老马' />
            <AtListItem title='收货电话' extraText='美食家' />
            <AtListItem title='收货地址' extraText='13012341234' />
          </AtList>
          <AtList className='user-help'>
            <AtListItem title='客服与帮助' arrow='right' onClick={this.callPhone} />
          </AtList>
        </View>
        <View className='user-foot'>
          {/* <a href="tel:12345678902">联系客服</a> */}
          <Text>技术支持：河北点闪科技有限公司</Text>
        </View>
      </View>
    )
  }
}
