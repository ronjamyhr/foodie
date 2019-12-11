import React from 'react'
import './App.scss'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import 'firebase/auth'
import Auth from './components/Auth/Auth'
import { IUser } from './types/User'
import { compose } from 'redux'
import { connect } from 'react-redux'

class App extends React.Component<IUser, {}> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.props.inloggedUser ? <Home /> : <Auth />}
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: any): IUser => {
  return {
    inloggedUser: state.firebase.auth.displayName,
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    null
  )
)(App)
