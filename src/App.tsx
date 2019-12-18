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
import Filter from './components/AllPlaces/Filter/Filter'
import Place from './components/Place/Place'
import AllPlaces from './components/AllPlaces/AllPlaces'

const App = ({ inloggedUser }: IUser) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {inloggedUser ? <Home /> : <Auth />}
        </Route>
        <Route exact path="/allplaces">
          {inloggedUser ? <AllPlaces /> : <Auth />}
        </Route>
        <Route exact path="/user">
          {inloggedUser ? <User /> : <Auth />}
        </Route>
        <Route exact path="/filter">
          {inloggedUser ? <Filter /> : <Auth />}
        </Route>
        <Route exact path="/place/:url">
          {inloggedUser ? <Place /> : <Auth />}
        </Route>
      </Switch>
      {inloggedUser ? <Navbar /> : null}
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
