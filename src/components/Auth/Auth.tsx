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
    <div>
      <div className="login-container">
        <div className="logo">Foodie</div>
        <div className="content">
          <p>We at foodie want you to find what you are looking for quickly and easily near you.</p>
        </div>
        <div className="signin-text">Sign in</div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  )
}

export default Auth
