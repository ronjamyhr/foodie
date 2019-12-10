import React, { useState, useEffect } from 'react'
import './googleMap.scss'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from './../../../index'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GoogleMapProvider, MapBox, Marker } from '@googlemap-react/core'
import Markers from './Markers/Markers'

const GoogleMap = ({ places }: LinkStateProps) => {
  const [center, setCenter] = useState<any>({ lat: 0, lng: 0 })

  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position: Position) =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
  }, [])

  return (
    <div className="google-map-container">
      <GoogleMapProvider>
        <MapBox
          apiKey={googleApiKey}
          opts={{
            center: center,
            zoom: 15,
          }}
        />
        <Marker
          opts={{
            position: {
              lat: center.lat,
              lng: center.lng,
            },
          }}
        />

        {places &&
          places.map(place => (
            <li key={place.id}>
              <Markers result={place} />
            </li>
          ))}
      </GoogleMapProvider>
    </div>
  )
}

interface LinkStateProps {
  places: IFoodPlaces[]
}

const mapStateToProps = (state: AppState, ownProps: any): LinkStateProps => {
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
