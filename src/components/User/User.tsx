import React from 'react'
import './user.scss'
import firebase from 'firebase/app'
import { IUser } from '../../types/User'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const User = ({ inloggedUser }: IUser) => {
  const firstCharacterOfInloggedUser = inloggedUser.charAt(0)
  return (
    <main className="user-container">
      <h1 className="user-heading">USER</h1>
      <div className="card">
        <div className="user-info-wrapper">
          <div className="user-icon-background">
            <p className="user-icon">{firstCharacterOfInloggedUser}</p>
          </div>

          <div className="user-text">
            <h2 className="user-title">Logged in as</h2>
            <p className="user-name">{inloggedUser}</p>
          </div>
        </div>

        <div className="favorite-places-wrapper">
          <h2 className="my-favorites">My favorites</h2>
        </div>
      </div>
      <div className="sign-out-button">
        <NavLink className="link" exact to="/" onClick={() => firebase.auth().signOut()}>
          LOG OUT
        </NavLink>
      </div>
    </main>
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
)(User)
