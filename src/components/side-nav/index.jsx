import React, { PureComponent } from 'react'
import { Menu, Button, Layout } from 'antd';
import * as Icon from '@ant-design/icons';
import './side-nav.css'
import logo_write from '../../assets/images/logo_write.png'
import storage from '../../utils/storageUtils'
import {MENU} from '../../constants'

const { SubMenu } = Menu;
const { Sider } = Layout;
export default class SideNav extends PureComponent {

  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  renderMenu = menu => {
    let userMenu;
    if(menu.children) {
      userMenu = (
        <SubMenu key={menu.id} title={menu.name} icon={React.createElement(Icon[menu.icon])}>
          {menu.children.map(
            child => <Menu.Item key={child.id}>{child.name}</Menu.Item>
          )}
        </SubMenu>
      )
    } else {
      userMenu = ( 
        <Menu.Item key={menu.id} icon={React.createElement(Icon[menu.icon])}>
          {menu.name}
        </Menu.Item>
      )
    }
    return userMenu;
  }

  render() {
    const { collapsed } = this.state
    const menuList = storage.get(MENU);
    return (
      <Sider collapsed={collapsed} className="side-nav">
        <header className="side-nav-header">
          <img className={!collapsed?"side-nav-logo":"side-nav-logo-collapsed"} src={logo_write} alt="logo"></img>
          <span className={!collapsed?"side-nav-company":"side-nav-company-collapsed"} >Surfaces</span>
          <Button className={!collapsed?"side-nav-top-btn":"side-nav-top-btn-collapsed"} type="primary" onClick={this.toggleCollapsed}>
            {React.createElement(collapsed ? Icon.MenuUnfoldOutlined : Icon.MenuFoldOutlined)}
          </Button>
        </header>
        <Menu mode="inline">
          {menuList.map(menu => this.renderMenu(menu))}
        </Menu>
      </Sider>
    )
  }
}
