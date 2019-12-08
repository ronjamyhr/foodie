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
import { GoogleMapProvider, HeatMap, InfoWindow, MapBox, Marker, Polygon } from '@googlemap-react/core'

const GoogleMap = ({ places }: LinkStateProps) => {
  const [center, setCenter] = useState<any>({ lat: 0, lng: 0 })
  const [infoWindow, setInfoWindow] = useState<boolean>(false)
  const [markerId, setMarkerId] = useState<string>('')

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       setYourPosition({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       })
  //     },
  //     error => console.log(error)
  //   )
  // }, [])

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position: Position) =>
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
  }, [])

  const handleClick = () => {
    setInfoWindow(true)

    console.log('hej')
  }

  const Markers =
    places && places.map(place => <MarkFoodPlaces key={place.id} lat={place.latitude} lng={place.longitude} />)

  return (
    <div className="google-map-container">
      <GoogleMapProvider>
        <MapBox
          apiKey="AIzaSyA4zLvrL8usMoLPyevblDs7J1SlooXHwkM"
          opts={{
            center: center,
            zoom: 15,
          }}
          style={{
            height: '100vh',
            width: '100%',
          }}
          // useDrawing
          // useGeometry
          // usePlaces
          // useVisualization
          onCenterChanged={() => {
            console.log('The center of the map has changed.')
          }}
        />
        <Marker
          opts={{
            position: {
              lat: center.lat,
              lng: center.lng,
            },
          }}
          // onClick={handleClick}
        />

        {console.log(places)}
        {places &&
          places.map(place => (
            <Marker
              id={place.id}
              key={place.id}
              onClick={handleClick}
              opts={{
                position: {
                  lat: place.latitude,
                  lng: place.longitude,
                },
              }}
            />
          ))}

        <InfoWindow
          anchorId="marker"
          opts={{
            content: 'This is an info window',
            // position: center,
          }}
          visible={infoWindow}
          onCloseClick={() => {
            setInfoWindow(false)
          }}
        />
      </GoogleMapProvider>

      {/* <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_API_KEY}` }}
          center={yourPosition}
          defaultZoom={zoom}
        >
          <MarkYourPlace lat={yourPosition.lat} lng={yourPosition.lng} />
          {Markers}
        </GoogleMapReact>
      </div> */}
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
