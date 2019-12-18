import React, { useState } from 'react'
import './markers.scss'
import { InfoWindow, Marker } from '@googlemap-react/core'
import { NavLink } from 'react-router-dom'

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
            scale: 0.8,
            fillColor: '#494343',
            fillOpacity: 0.8,
            strokeOpacity: 0,
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
        <div className="info-window-container">
          <div className="info-window-wrapper-top">
            <div className="info-window-image-frame">
              <img
                className="info-window-image"
                src={require(`./../../../../assets/${result.image}`)}
                alt={result.name}
                title={result.name}
              />
            </div>

            <NavLink className="info-window-link" exact to={`/place/${result.url}`}>
              <h1 className="info-window-heading">{result.name}</h1>
            </NavLink>
          </div>
          <div className="info-window-wrapper-bottom">
            <p className="info-window-adress">{result.adress}</p>
          </div>
        </div>
      </InfoWindow>
    </React.Fragment>
  )
}

export default Markers
