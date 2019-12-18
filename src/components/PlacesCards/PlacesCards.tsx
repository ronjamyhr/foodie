import React from 'react'
import './placesCards.scss'
import { NavLink } from 'react-router-dom'

interface IProps {
  result: any
}

const PlacesCards = ({ result }: IProps) => {
  return (
    <div className="places-card-wrapper">
      <div className="place-image-frame">
        <img
          className="place-image"
          src={require(`./../../assets/${result.image}`)}
          alt={result.name}
          title={result.name}
        />
      </div>
      <div className="place-description">
        <NavLink className="place-link" exact to={`/place/${result.url}`}>
          <p className="place-name">{result.name}</p>
        </NavLink>
        <p className="place-adress">{result.adress}</p>
        <p className="place-short-description">{result.shortDescription}</p>
      </div>
    </div>
  )
}

export default PlacesCards
