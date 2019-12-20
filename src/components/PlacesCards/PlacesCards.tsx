import React from 'react'
import './placesCards.scss'
import { NavLink } from 'react-router-dom'

interface IProps {
  place: any
}

const PlacesCards = ({ place }: IProps) => {
  return (
    <article className="places-card-wrapper">
      <div className="place-image-frame">
        <img
          className="place-image"
          src={require(`./../../assets/${place.image}`)}
          alt={`${place.name} inspirational food and/or drinks`}
          title={place.name}
        />
      </div>
      <div className="place-description">
        <NavLink className="place-link" exact to={`/place/${place.url}`}>
          <p className="place-name">{place.name}</p>
        </NavLink>
        <p className="place-adress">{place.adress}</p>
        <p className="place-short-description">{place.shortDescription}</p>
      </div>
    </article>
  )
}

export default PlacesCards
