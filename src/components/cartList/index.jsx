import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Radio } from '@tarojs/components'
import { AtIcon, AtTag, AtMessage } from 'taro-ui'
import API from '@api/api'
import './index.less'

export default class CartList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      menuList: [],
      isAllChecked: false
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {}

  filterMenu(id) {
    const { menuList } = this.props;
    const rows = menuList.filter(item => item.id == id)
    return rows[0] ? rows[0].menuName : ''
  }

  handleRadio = (row) => {
    this.props.callBack('checked', row)
  }

  delCart = async (item) => {
    let result = await API.getCartList(`/weixin/cart/deleteGoods?goodsId=${item.id}&openid=o6_bmjrPTIm6_2sgVt7hMZOPfL2M`)
    if(result.code !== 200) return Taro.atMessage({ 'message': result.msg, 'type': 'error' })
    this.props.callBack('del')
    return Taro.atMessage({ 'message': '删除成功', 'type': 'success' })
  }

  render() {
    const { type, list } = this.props
    const API_HOSTNAME = process.env.API_HOSTNAME;
    return (    
      <View className='order-list'>
        <AtMessage />
        {list.length>0 && list.map(item => (
          <View className='list-item'>
            <View className='list-item-top'>
              <Text className='list-item-top-data'>添加日期：<Text>{item.createDate}</Text></Text>
              {type!=='detailed' && <AtIcon value='trash' size='18' color='rgba(112, 112, 112, 1)' onClick={this.delCart.bind(this,item)}></AtIcon>}
            </View>
            <View className='list-item-content'>
              {type!=='detailed' && <Radio value='选中' checked={item.checked} onChange={this.handleRadio.bind(this, item)}></Radio> } 
              <Image className='item-img' src={`${API_HOSTNAME}${item.goodsImg}`} />
              <View className='list-item-content-text'>
                <View className='list-item-content-text-title'>
                  <View className='title-h'>{item.goodsName}</View>
                  <AtTag size='small'>{ this.filterMenu(item.menuId) }</AtTag>
                </View>
                <Text className='price'><Text className='unit'>¥</Text>{item.goodsPrice}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}