import { combineReducers } from 'redux'
// import { placesReducer } from './placesReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
})
