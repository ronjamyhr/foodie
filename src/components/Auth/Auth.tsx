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
    <main className="login-container">
      <article className="information-wrapper">
        <img
          className="foodie-logo-login"
          src={require('./../../assets/logo-foodie.png')}
          alt="Logotype of Foodie"
          title="Foodie logo"
        />
        <h1 className="foodie-title">FOODIE</h1>
        <p className="foodie-text">
          We at Foodie want you to find what you are looking for quickly and easily near you.
        </p>
      </article>
      <div className="signin-wrapper">
        <h2 className="signin-text">SIGN IN</h2>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </main>
  )
}

export default Auth
