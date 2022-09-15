import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import avatar from '@assets/images/avatar.png'
import edit from '@assets/images/icon_edit.png'
import { AtList, AtListItem } from 'taro-ui'
import API from '@api/api'
import './index.less'

export default class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }

  config = {
    navigationBarTitleText: '我的'
  }

  componentDidMount() {
    this.getUserInfo()
    // weixin/user/userInfo?openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M
    // get
  }

  getUserInfo = async () => {
    const result = await API.getUserInfo('/weixin/user/userInfo')
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.setState({ userInfo: result.data })
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
    const { userInfo } = this.state;
    const API_HOSTNAME = process.env.API_HOSTNAME;
    return (
      <View className='user-wrap'>
        <View className='user-content'>
          <View className='user-top'>
            <Image src={ userInfo.img ? userInfo.img : avatar}></Image>
            <Text>{userInfo.shopsName}<Image onClick={this.toEdit} src={edit}></Image></Text>
          </View>
          <AtList>
            <AtListItem title='收货姓名' extraText={ userInfo.userName || '' } />
            <AtListItem title='收货电话' extraText={ userInfo.phone || '' } />
            <AtListItem title='收货地址' extraText={ userInfo.address || '' } />
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
