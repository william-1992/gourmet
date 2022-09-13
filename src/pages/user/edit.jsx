import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, Picker } from '@tarojs/components'
import avatar from '@assets/images/avatar.png'
import { AtForm, AtInput, AtButton, AtIcon, AtMessage } from 'taro-ui'
import { areas } from './area';
import API from '@api/api'
import './index.less'

export default class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      provinces: [], 
      citys: [],
      counts: [],
      shopsName: '',
      userName: '',
      phone: '',
      region: '',
      regionName: '',
      regionCode: [],
      address: ''
    }
  }

  config = {
    navigationBarTitleText: '编辑'
  }

  componentDidMount () {
    const provinces = areas[0] && areas.map(({ areaLvl, label, parentId, value, children }) => ({ areaLvl, label, parentId, value, children }))
    const citys = areas[0].children[0] && areas[0].children.map(({ areaLvl, label, parentId, value, children }) => ({ areaLvl, label, parentId, value, children }))
    const counts = areas[0].children[0].children[0] && areas[0].children[0].children.map(({ areaLvl, label, parentId, value }) => ({ areaLvl, label, parentId, value }))
    this.setState({ provinces, citys, counts })
  }

  handleChange (value) {
    this.setState({
      value
    })
  }
  onSubmit = async (event) => {
    const { label, name, phone, address, regionCode } = this.state
    const result = await API.updateUser('/weixin/user/update', { label, name, phone, address, regionCode })
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    Taro.navigateTo({ url: '/pages/user/index' })
    return Taro.atMessage({ 'message': '保存成功', 'type': 'success' })
  }
  // input触发
  onInputChange (label, val) {
    this.setState({ [label]: val })
  }

  getRegion = () => {
    this.setState({ modalVisible: true })
  }

  onChange = e => {
    const { provinces, citys, counts } = this.state;
    const {value = [0,0,0]} = e.detail 
    this.setState({
      region: value,
      regionName: `${provinces[value[0]].label} ${citys[value[1]]?citys[value[1]].label:''} ${counts[value[2]]?counts[value[2]].label:''}`,
      regionCode: [provinces[value[0]].value, citys[value[1]]?citys[value[1]].value:'', counts[value[2]]?counts[value[2]].value:'']
    })
  }

  onColumnChange = (e) => {
    const { provinces, citys } = this.state
    const { column, value } = e.detail
    if(column === 0) {
      const cityArr = provinces[value].children ? provinces[value].children : []
      const countArr = (cityArr[0] && cityArr[0].children) ? cityArr[0].children : []
      this.setState({ citys: cityArr, counts: countArr })
    }else if(column === 1) {
      const countArr = citys[value].children ? citys[value].children : []
      this.setState({ counts: countArr })
    }
  }

  render () {
    const { provinces, citys, counts, region, regionName } = this.state;
    const addresArr = [provinces, citys, counts]
    return (
      <View className='user-wrap user-edit-wrap'>
        <AtMessage />
        <View className='user-top'>
          <Image src={avatar}></Image>
          {/* <Text>美食家店家<Image src={edit}></Image></Text> */}
        </View>
        <AtForm
          onSubmit={this.onSubmit}
        >
          <View className='user-form'>
            <AtInput 
              name='shopsName' 
              title='商铺名称' 
              type='text' 
              placeholder='请填写' 
              value={this.state.shopsName} 
              onChange={this.onInputChange.bind(this, 'shopsName')}
            />
            <AtInput 
              name='userName' 
              title='收货姓名' 
              type='text' 
              placeholder='请填写' 
              value={this.state.userName} 
              onChange={this.onInputChange.bind(this, 'userName')}
            />
            <AtInput 
              name='phone' 
              title='手机号' 
              type='text' 
              placeholder='请填写' 
              value={this.state.phone} 
              onChange={this.onInputChange.bind(this, 'phone')}
            />
            <Picker 
              mode='multiSelector' 
              range={addresArr} 
              rangeKey='label' 
              value={region} 
              onChange={this.onChange}
              onColumnChange={this.onColumnChange}
            >
              <AtInput 
                name='region' 
                title='所在地区' 
                type='text' 
                placeholder='省、市、区' 
                value={regionName} 
              ><AtIcon onClick={this.getRegion} value='map-pin' size='20' color='#FFAC27'></AtIcon></AtInput>
            </Picker>
            <AtInput 
              className='input-last'
              name='address' 
              title='详细地址' 
              type='text' 
              placeholder='小区楼栋名称' 
              value={this.state.address} 
              onChange={this.onInputChange.bind(this, 'address')}
            />
          </View>
          <AtButton type='primary' formType='submit'>保存</AtButton>
        </AtForm>
      </View>
    )
  }
}
