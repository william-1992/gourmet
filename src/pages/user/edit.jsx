import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import avatar from '@assets/images/avatar.png'
import { AtList, AtListItem, AtForm, AtInput, AtButton, AtIcon } from 'taro-ui'
import './index.less'

export default class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      label: '',
      name: '',
      phone: '',
      region: '',
      address: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '编辑'
  }

  handleChange (value) {
    this.setState({
      value
    })
  }
  onSubmit (event) {
    console.log(this.state.value, event)
  }

  render () {
    return (
      <View className='user-wrap user-edit-wrap'>
        <View className='user-top'>
          <Image src={avatar}></Image>
          {/* <Text>美食家店家<Image src={edit}></Image></Text> */}
        </View>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
        >
          <View className='user-form'>
            <AtInput 
              name='label' 
              title='商铺名称' 
              type='text' 
              placeholder='请填写' 
              value={this.state.label} 
            />
            <AtInput 
              name='name' 
              title='收货姓名' 
              type='text' 
              placeholder='请填写' 
              value={this.state.name} 
            />
            <AtInput 
              name='phone' 
              title='手机号' 
              type='text' 
              placeholder='请填写' 
              value={this.state.phone} 
            />
            <AtInput 
              name='region' 
              title='所在地区' 
              type='text' 
              placeholder='省、市、区' 
              value={this.state.region} 
            ><AtIcon value='map-pin' size='20' color='#FFAC27'></AtIcon></AtInput>
            <AtInput 
              className='input-last'
              name='address' 
              title='详细地址' 
              type='text' 
              placeholder='小区楼栋名称' 
              value={this.state.address} 
            />
          </View>
          <AtButton type='primary' formType='submit'>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}
