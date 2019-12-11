import React, { useState } from 'react'
import './markers.scss'
import { InfoWindow, Marker } from '@googlemap-react/core'
import { Link } from 'react-router-dom'

interface IProps {
  result: any
}

const Markers = ({ result }: IProps) => {
  const [infoWindow, setInfoWindow] = useState<boolean>(false)

  const handleClick = () => {
    setInfoWindow(true)
  }

  return (
    <React.Fragment>
      <Marker
        id={result.id}
        key={result.id}
        onClick={handleClick}
        opts={{
          position: {
            lat: result.latitude,
            lng: result.longitude,
          },
          icon: {
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            fillColor: '#000000',
            fillOpacity: 1,
            strokeWeight: 0.8,
            scale: 0.5,
          },
        }}
      />
      <InfoWindow
        anchorId={result.id}
        visible={infoWindow}
        onCloseClick={() => {
          setInfoWindow(false)
        }}
      >
        <div>
          <h1>{result.name}</h1>
          <p>{result.adress}</p>
          <Link className="link" to="/">
            <button className="button">Info</button>
          </Link>
        </div>
      </InfoWindow>
    </React.Fragment>
  )
}

export default Markers
