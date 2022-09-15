import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Radio } from '@tarojs/components'
import { AtIcon, AtTag, AtModal } from 'taro-ui'
import API from '@api/api'
import './index.less'

const API_HOSTNAME = process.env.API_HOSTNAME;

export default class CartList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      delItem: {},
      visible: false,
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

  delCart = (item) => {
    this.setState({ visible: true, delItem: item })
  }

  confrim = async () => {
    let result = await API.getDelCartl(`/weixin/cart/deleteGoods`, { goodsId: this.state.delItem.id })
    if(result.code !== 200) return Taro.showToast({ title: result.msg, icon: 'none', duration: 2000 });
    this.props.callBack('del')
    this.setState({ visible: false })
    return Taro.showToast({ title: '删除成功', duration: 2000 });
  }

  openPreview = (item) => {
    Taro.previewImage({
      current: `${API_HOSTNAME}${item.goodsImg}`, // 当前显示图片的http链接
      urls: [`${API_HOSTNAME}${item.goodsImg}`], // 需要预览的图片http链接列表
    })
  }

  render() {
    const { visible } = this.state;
    const { type, list } = this.props
    const API_HOSTNAME = process.env.API_HOSTNAME;
    return (    
      <View className='order-list cart-list'>
        {list.length>0 && list.map(item => (
          <View className='list-item'>
            <View className='list-item-top'>
              <Text className='list-item-top-data'>添加日期：<Text>{item.createDate}</Text></Text>
              {type!=='detailed' && <AtIcon value='trash' size='18' color='rgba(112, 112, 112, 1)' onClick={this.delCart.bind(this,item)}></AtIcon>}
            </View>
            <View className='list-item-content'>
              {type!=='detailed' && <Radio value='选中' checked={item.checked} onChange={this.handleRadio.bind(this, item)}></Radio> } 
              <Image onClick={this.openPreview.bind(this, item)} className='item-img' src={`${API_HOSTNAME}${item.goodsImg}`} />
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
        <AtModal
          isOpened={visible}
          title='提示'
          cancelText='取消'
          confirmText='删除'
          onCancel={ () => { this.setState({ visible: false }) } }
          onConfirm={ this.confrim.bind(this) }
          content='确认删除？'
        />
      </View>
    )
  }
}