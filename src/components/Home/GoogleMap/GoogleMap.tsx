import React, { useState, useEffect } from 'react'
import './googleMap.scss'
import GoogleMapReact from 'google-map-react'
import MarkYourPlace from './MarkYourPlace/MarkYourPlace'
import MarkFoodPlaces from './MarkFoodPlaces/MarkFoodPlaces'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from './../../../index'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

const GoogleMap = ({ places }: LinkStateProps) => {
  const [yourPosition, setYourPosition] = useState<any>({
    lat: null,
    lng: null,
  })
  const [zoom] = useState<number>(15)

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

  const Markers =
    places && places.map(place => <MarkFoodPlaces key={place.id} lat={place.latitude} lng={place.longitude} />)

  return (
    <div className="google-map-container">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_API_KEY}` }}
          center={yourPosition}
          defaultZoom={zoom}
        >
          <MarkYourPlace lat={yourPosition.lat} lng={yourPosition.lng} />
          {Markers}
        </GoogleMapReact>
      </div>
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
