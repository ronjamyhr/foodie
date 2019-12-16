import React from 'react'
import './App.scss'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import 'firebase/auth'
import Auth from './components/Auth/Auth'
import { IUser } from './types/User'
import { compose } from 'redux'
import { connect } from 'react-redux'
import User from './components/User/User'
import Navbar from './components/Navbar/Navbar'

const App = ({ inloggedUser }: IUser) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {inloggedUser ? <Home /> : <Auth />}
        </Route>
        <Route exact path="/user">
          {inloggedUser ? <User /> : <Auth />}
        </Route>
      </Switch>
      <Navbar />
    </BrowserRouter>
  )
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
