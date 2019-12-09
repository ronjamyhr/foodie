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
          {/* <button
            onClick={() => {
              alert('Hello')
            }}
          >
            Ska gå till info om matstället
          </button> */}
        </div>
      </InfoWindow>
    </React.Fragment>
  )
}

export default Markers
