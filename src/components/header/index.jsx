import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Breadcrumb, Menu, Dropdown, Button, Avatar, Modal } from 'antd';
import * as Icon from '@ant-design/icons';
import storage from '../../utils/storageUtils'
import { USER, MENU } from '../../constants'
import './header.css'
import {getWeather} from '../../api'
import heejin from '../../assets/images/heejin2.jpg'
import fair from '../../assets/images/weather/晴.png'
import wind from '../../assets/images/weather/风.png'
import snow from '../../assets/images/weather/雪.png'
import rain from '../../assets/images/weather/雨.png'
import cloud from '../../assets/images/weather/云.png'

const weatherIcons = [
  {weather:'晴',icon:fair},
  {weather:'云',icon:cloud},
  {weather:'阴',icon:cloud},
  {weather:'雨',icon:rain},
  {weather:'风',icon:wind},
  {weather:'雪',icon:snow},
]
class Header extends PureComponent {

  state = {
    menuList: storage.get(MENU),
    userInfo: storage.get(USER),
    weather:'',
    weatherIcon :'',
  }

  componentDidMount(){
    this.renderWeather()
  }

  /* 获取临沧的天气 */
  renderWeather = async () => {
    let {weather} = await getWeather()
    let icon;
    weatherIcons.forEach(item=> {
      if(weather.indexOf(item.weather) !== -1) icon = item.icon
    })
    this.setState({weather,weatherIcon:icon})
  }

  /* 面包屑 */
  renderBread = menuList => {
    const { pathname } = this.props.location
    let current = [];
    menuList && menuList.forEach(menu => {
      if (menu.children) {
        menu.children.forEach(child => {
          if (pathname === child.url) current = [{ name: menu.name, icon: Icon[menu.icon] }, { name: child.name }]
        })
      } else {
        if (pathname === menu.url && pathname !== '/') current = [{ name: menu.name, icon: Icon[menu.icon] }]
      }
    })
    current.unshift({ name: '主页', icon: Icon.BankOutlined, url: '/' });
    return (
      <Breadcrumb className="header-bread">
        {current.length > 0 && current.map((item, index) =>
          <Breadcrumb.Item className="header-bread-item" href={index === 0 ? item.url : null} key={item.name}>
            <span>{item.icon && React.createElement(item.icon)} </span>
            <span>{item.name}</span>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    )
  }

  checkOut = () => {
    Modal.confirm({
      title:"确认退出登录吗？",
      icon: React.createElement(Icon.ExclamationCircleOutlined),
      okText:"确认",
      cancelText:"取消",
      onOk: () => {
        storage.remove(USER);
        storage.remove(MENU);
        this.props.history.replace('/login')
      }
    })
  }

  /* 用户信息操作 */
  renderUser = () => {
    return (
      <Menu className="header-dropdown-menu">
        <Menu.Item key={1} icon={React.createElement(Icon.KeyOutlined)}>
          <Button type="link">
            修改密码
          </Button>
        </Menu.Item>
        <Menu.Item key={2} icon={React.createElement(Icon.LogoutOutlined)}>
          <Button onClick={this.checkOut} type="link">
            安全退出
          </Button>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    const { menuList, userInfo, weather, weatherIcon } = this.state
    return (
      <header className="header">
        {this.renderBread(menuList)}
        <div className="header-right">
          {weatherIcon ? 
          <div className="header-right-weather">
            <img alt="weather" src={weatherIcon} />
            <span>{weather}</span>
          </div>
          :<div className="header-right-weather"></div>
          }
          <Dropdown overlay={this.renderUser()} className="header-right-userInfo">
          <Button type="link">
            <Avatar src={heejin} />
            {userInfo && userInfo.username}
            {React.createElement(Icon.DownOutlined)}
          </Button>
        </Dropdown>
        </div>
      </header>
    )
  }
}

export default withRouter(Header)
