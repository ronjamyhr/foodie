import React from 'react'
import './user.scss'
import firebase from 'firebase'
import { IUser } from '../../types/User'
import { compose } from 'redux'
import { connect } from 'react-redux'

const User = ({ inloggedUser }: IUser) => {
  return (
    <div className="user-container">
      <h1>USER</h1>
      <div className="card">
        <div className="user-title">Logged in as</div>
        <p>{inloggedUser}</p>
        <div className="my-favorites">My favorites</div>
      </div>
      <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
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
