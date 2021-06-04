import React, { PureComponent } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import storage from '../../utils/storageUtils'
import { USER } from '../../constants'
import Header from '../../components/header'
import SideNav from '../../components/side-nav'
import PlateWeight from '../plate-weight'
import Sku from '../sku'
import ShippingPacking from '../shipping-packing'
import MatAttr from '../mat-attr'
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
          <Content className="main-layout-content">
            <Switch>
              <Route path='/shipping/packing' component={ShippingPacking} />
              <Route path='/plateWeight' component={PlateWeight} />
              <Route path='/sku' component={Sku} />
              <Route path='/matAttrList' component={MatAttr} />
              <Redirect to='/' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
