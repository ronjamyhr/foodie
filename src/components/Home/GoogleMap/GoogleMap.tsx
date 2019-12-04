import React, { useState, useEffect } from 'react'
import './googleMap.scss'
import GoogleMapReact from 'google-map-react'
import MarkYourPlace from './MarkYourPlace/MarkYourPlace'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from './../../../index'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

// const Marker = ({ text }: any) => <div>{text}</div>
const Markers = ({ text }: any) => <div>{text}</div>

const GoogleMap = ({ places }: LinkStateProps) => {
  const [yourPosition, setYourPosition] = useState<any>({
    lat: null,
    lng: null,
  })
  const [zoom, setZoom] = useState<number>(15)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setYourPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      error => console.log(error)
    )
  }, [])

  console.log('hej', places)

  return (
    <div className="google-map-container">
      <h2>Google map</h2>
      <ul>
        <h3>HEEEEJ</h3>
        {places &&
          places.map(place => (
            <div key={place.id}>
              <li>
                <p>{place.hej}</p>
                <p>{place.yey}</p>
              </li>
            </div>
          ))}
      </ul>

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_API_KEY}` }}
          center={yourPosition}
          defaultZoom={zoom}
        >
          <MarkYourPlace
            lat={yourPosition.lat}
            lng={yourPosition.lng}
            name="My Marker"
            color="red"
          />

          <Markers lat={59.626338} lng={17.851603} text="PLACES" />
        </GoogleMapReact>
      </div>
    </div>
  )
}

interface LinkStateProps {
  places: IFoodPlaces[]
}

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
  console.log('korv', state)
  return {
    places: state.firestore.ordered.foodplaces,
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: 'foodplaces' }])
)(GoogleMap)
