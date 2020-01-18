import React, { useState } from 'react'
import './markers.scss'
import { InfoWindow, Marker } from '@googlemap-react/core'
import { NavLink } from 'react-router-dom'
import { IFoodPlaces } from '../../../../types/FoodPlaces'

interface IPlacesCardsProps {
  place: IFoodPlaces
}

const Markers = ({ place }: IPlacesCardsProps) => {
  const [infoWindow, setInfoWindow] = useState<boolean>(false)

  const handleClick = () => {
    setInfoWindow(true)
  }

  return (
    <React.Fragment>
      <Marker
        id={place.id}
        key={place.id}
        onClick={handleClick}
        opts={{
          position: {
            lat: place.latitude,
            lng: place.longitude,
          },
          //Icon-color and appearance of the reataurants
          icon: {
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            scale: 0.6,
            fillColor: '$detail-color-dark',
            fillOpacity: 0.8,
            strokeOpacity: 0,
          },
        }}
      />

      <InfoWindow
        anchorId={place.id}
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
                src={require(`./../../../../assets/${place.image}`)}
                alt={`${place.name} inspirational food and/or drinks`}
                title={place.name}
              />
            </div>

            <NavLink className="info-window-link" exact to={`/place/${place.url}`}>
              <h1 className="info-window-heading">{place.name}</h1>
            </NavLink>
          </div>
          <div className="info-window-wrapper-bottom">
            <p className="info-window-adress">{place.adress}</p>
          </div>
        </div>
      </InfoWindow>
    </React.Fragment>
  )
}

export default Markers
