import React from 'react'
import './user.scss'
import firebase from 'firebase'
import { IUser } from '../../types/User'
import { compose } from 'redux'
import { connect } from 'react-redux'

const User = ({ inloggedUser }: IUser) => {
  const firstCharacterOfInloggedUser = inloggedUser.charAt(0)
  return (
    <div className="user-container">
      <h1 className="user-heading">USER</h1>
      <div className="card">
        <div className="user-info-wrapper">
          <p className="user-icon">{firstCharacterOfInloggedUser}</p>
          <div className="user-text">
            <h2 className="user-title">Logged in as</h2>
            <p className="user-name">{inloggedUser}</p>
          </div>
        </div>
        <h2 className="my-favorites">My favorites</h2>
        <div className="favorite-places-wrapper"></div>
      </div>
      <div className="sign-out-button">
        <button className="button" onClick={() => firebase.auth().signOut()}>
          LOG OUT
        </button>
      </div>
    </div>
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
