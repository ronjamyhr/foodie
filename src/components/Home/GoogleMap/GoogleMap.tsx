import React, { useState, useEffect } from 'react'
import './googleMap.scss'
import GoogleMapReact from 'google-map-react'
import MarkYourPlace from './MarkYourPlace/MarkYourPlace'

// const Marker = ({ text }: any) => <div>{text}</div>
const Markers = ({ text }: any) => <div>{text}</div>

const GoogleMap = (props: any) => {
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

  return (
    <div className="google-map-container">
      <h2>Google map</h2>
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

export default GoogleMap
