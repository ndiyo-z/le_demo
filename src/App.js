import React, { PureComponent } from 'react'
import { BrowserRouter , Switch ,Route, Redirect } from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
          <Redirect to='/login'></Redirect>
        </Switch>
      </BrowserRouter>
    )
  }
}
