import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { firebaseConfig } from './config/firebase'
import firebase from 'firebase/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from 'redux-firestore'
// import { AppActions } from './types/actionTypes'
import 'firebase/firestore'
import { rootReducer } from './store/reducers/rootReducer'

export type AppState = ReturnType<typeof rootReducer>

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export const store = createStore(
  rootReducer,
  compose(
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument({
        getFirebase,
        getFirestore,
      }) as ThunkMiddleware<AppState>)
    ),
    reduxFirestore(firebase)
  )
)

const rrfConfig = {
  firebaseConfig,
  useFirestoreForProfile: true,
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
