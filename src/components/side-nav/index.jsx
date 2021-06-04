import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Button, Layout } from 'antd';
import * as Icon from '@ant-design/icons';
import './side-nav.css'
import logo_write from '../../assets/images/logo_write.png'
import storage from '../../utils/storageUtils'
import { MENU } from '../../constants'

const { SubMenu } = Menu;
const { Sider } = Layout;
class SideNav extends PureComponent {

  state = {
    menuList: storage.get(MENU),
    collapsed: false,
    openKeys: []
  }

  /* 刷新时可以根据路径展开路由菜单 */
  componentDidMount() {
    const { pathname } = this.props.location
    const { menuList } = this.state
    menuList && menuList.forEach(menu => {
      if (menu.children) {
        menu.children.forEach(child => {
          if(pathname === child.url) this.setState({ openKeys: [menu.url], defaultOpenKeys: [menu.url]})
        })
      } 
    })
  }

  /* 只展开一个SubMenu */
  onOpenChange = openKeys => {
    if (openKeys.length > 1) {
      this.setState({ openKeys: [openKeys[openKeys.length - 1]] })
    } else {
      this.setState({ openKeys: [...openKeys] })
    }
  }

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  renderMenu = menu => {
    let userMenu;
    if (menu.children) {
      userMenu = (
        <SubMenu key={menu.url} title={menu.name} icon={React.createElement(Icon[menu.icon])}>
          {menu.children.map(
            child => {
              return this.renderMenu(child)
            }
          )}
        </SubMenu>
      )
    } else {
      userMenu = (
        <Menu.Item key={menu.url} icon={menu.icon && React.createElement(Icon[menu.icon])}>
          <Link to={menu.url}>{menu.name}</Link>
        </Menu.Item>
      )
    }
    return userMenu;
  }

  render() {
    const { collapsed, openKeys, menuList } = this.state
    const { location } = this.props
    return (
      <Sider collapsed={collapsed} className="side-nav">
        <header className="side-nav-header">
          <img className={!collapsed ? "side-nav-logo" : "side-nav-logo-collapsed"} src={logo_write} alt="logo"></img>
          <span className={!collapsed ? "side-nav-company" : "side-nav-company-collapsed"} >Surfaces</span>
          <Button className={!collapsed ? "side-nav-top-btn" : "side-nav-top-btn-collapsed"} type="link" style={{color:'#fff'}} onClick={this.toggleCollapsed}>
            {React.createElement(collapsed ? Icon.MenuUnfoldOutlined : Icon.MenuFoldOutlined)}
          </Button>
        </header>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={this.onOpenChange}
          mode="inline"
        >
          {menuList && menuList.map(menu => this.renderMenu(menu))}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SideNav)
