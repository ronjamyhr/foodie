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
    console.log('Korv:', firebase.auth())
    return (
      <div>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />

        {firebase.auth().currentUser && (
          <div></div>
          // <h1>{firebase.auth().currentUser.displayName}</h1>
        )}
        {/* <p>{firebase.auth().currentUser && firebase.auth().currentUser.displayName}</p>  */}
      </div>
    )
  }
}

export default Auth
