import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import './login.css'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo_red from '../../assets/images/logo_red.png'
import { login } from '../../api'
import storage from '../../utils/storageUtils'
import { USER, MENU } from '../../constants'
import { menu } from '../../menu-temp'
const Item = Form.Item

export default class Login extends PureComponent {

  onFinish = async (values) => {
    let result = await login(values)
    console.log("response", result);
    if (result.status === 9) {
      message.error("登录失败: " + result.message)
    } else {
      message.success(result.message)
      storage.set(USER, values);
      storage.set(MENU,menu);
      this.props.history.replace('/')
    }
  }

  render() {
    if (storage.get(USER)) return <Redirect to='/' />
    return (
      <div className='login'>
        <div className='login-container'>
          <header className='login-header'>
            <img src={logo_red} alt='img'></img>
            <span>Surfaces</span>
          </header>
          <Form className="login-form" onFinish={this.onFinish}>
            <Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input size="large" prefix={<UserOutlined />} type="text" placeholder="用户账号/手机号" />
            </Item>
            <Item name="password" rules={[{ required: true, message: '请输入密码' }, { min: 4, message: '密码小于4位' }]}>
              <Input size="large" prefix={<LockOutlined />} type="password" placeholder="密码" />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">登录</Button>
            </Item>
          </Form>
          <div className="login-footer">
            <Checkbox className="checkbox">记住密码</Checkbox>
            <Button type='link'>忘记密码</Button>
          </div>
        </div>
      </div>
    )
  }
}
