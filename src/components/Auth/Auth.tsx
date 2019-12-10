import React from 'react'
import './auth.scss'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'

interface IState {
  isSignedIn: boolean
}

class Auth extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isSignedIn: false,
    }
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render() {
    // console.log('Korv:', firebase.auth())
    return (
      <div>
        <div className="login-container">
          <div className="logo">Foodie</div>
          <div className="content">
            <p>We at foodie want you to find what you are looking for quickly and easily near you.</p>
          </div>
          <div className="signin-text">Sign in</div>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          {/* {firebase.auth().currentUser.displayName } */}
          {/* <p>{firebase.auth().currentUser && firebase.auth().currentUser.displayName}</p> */}
        </div>
      </div>
    )
  }
}

export default Auth
