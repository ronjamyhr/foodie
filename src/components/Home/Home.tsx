import React from 'react'
import './home.scss'
import GoogleMap from './GoogleMap/GoogleMap'
import firebase from 'firebase/app'

const Home = () => {
  return (
    <div>
      <GoogleMap />
    </div>
  )
}

export default Home
