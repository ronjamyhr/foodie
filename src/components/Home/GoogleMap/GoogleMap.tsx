import React, { useState, useEffect } from 'react'
import './googleMap.scss'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from './../../../index'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GoogleMapProvider, MapBox, Marker } from '@googlemap-react/core'
import Markers from './Markers/Markers'

interface LinkStateProps {
  places: IFoodPlaces[]
}

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
            icon: {
              path:
                'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
              fillColor: '#c42d2d',
              fillOpacity: 0.6,
              strokeWeight: 2,
              scale: 0.9,
            },
          }}
        />

        {places &&
          places.map(place => (
            <div key={place.id}>
              <Markers place={place} />
            </div>
          ))}
      </GoogleMapProvider>
    </div>
  )
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  places: state.firestore.ordered.foodplaces,
})

export default compose<any>(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: 'foodplaces' }])
)(GoogleMap)
