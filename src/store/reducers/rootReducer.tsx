import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})
