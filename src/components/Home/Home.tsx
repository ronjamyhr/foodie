import React from 'react'
import './home.scss'
import GoogleMap from './GoogleMap/GoogleMap'
import firebase from 'firebase'

const Home = () => {
  return (
    <div>
      <GoogleMap />
      <h2>Knapp:</h2>
      <button onClick={() => firebase.auth().signOut()}>Sign Out!</button>
    </div>
  )
}

export default Home
