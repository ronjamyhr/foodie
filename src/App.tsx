import React from 'react'
import './App.scss'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'

interface IState {
  isSignedIn: boolean
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      isSignedIn: false,
    }
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
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
    return (
      <BrowserRouter>
        <Switch>
          {this.state.isSignedIn ? (
            <React.Fragment>
              <button onClick={() => firebase.auth().signOut()}>
                Sign Out!
              </button>
              <Route path="/" component={Home} />
            </React.Fragment>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
