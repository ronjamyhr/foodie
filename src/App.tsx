import React from 'react'
import './App.scss'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import firebase from 'firebase/app'
import 'firebase/auth'
import Auth from './components/Auth/Auth'

// interface IState {
//   isSignedIn: boolean
// }

class App extends React.Component<{}, {}> {
  // constructor(props: any) {
  //   super(props)

  //   this.state = {
  //     isSignedIn: false,
  //   }
  // }

  // uiConfig = {
  //   signInFlow: 'popup',
  //   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  //   callbacks: {
  //     signInSuccessWithAuthResult: () => false,
  //   },
  // }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({ isSignedIn: !!user })
  //   })
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Auth} />
          </Switch>
          {/* {this.state.isSignedIn ? (
            <div>Signed In</div>
          ) : (
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          )} */}
        </div>
      </BrowserRouter>
    )
  }
}

export default App
