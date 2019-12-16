import React from 'react'
import './auth.scss'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'

const Auth = () => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  return (
    <div className="login-container">
      <div className="information-wrapper">
        <div className="foodie-logo">img tagg</div>
        <h1 className="foodie-title">FOODIE</h1>
        <p className="foodie-text">
          We at foodie want you to find what you are looking for quickly and easily near you.
        </p>
      </div>
      <div className="signin-wrapper">
        <h2 className="signin-text">SIGN IN</h2>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  )
}

export default Auth
