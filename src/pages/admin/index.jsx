import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import storage from '../../utils/storageUtils'
import { USER } from '../../constants'
import Header from '../../components/header'
import SideNav from '../../components/side-nav'
import './admin.css'

const { Content } = Layout;
export default class Admin extends PureComponent {
  render() {
    let user = storage.get(USER)
    if (!user) return <Redirect to='/login' />
    return (
      <Layout className="main-layout">
        <SideNav />
        <Layout>
          <Header />
          <Content>Content</Content>
        </Layout>
      </Layout>
    )
  }
}
