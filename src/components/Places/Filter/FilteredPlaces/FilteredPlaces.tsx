import React from 'react'
import './filteredPlaces.scss'
import { NavLink } from 'react-router-dom'

interface IProps {
  result: any
}

const FilteredPlaces = ({ result }: IProps) => {
  return (
    <div className="filtered-places-wrapper">
      <NavLink className="place-link" exact to={`/place/${result.url}`}>
        <p>{result.name}</p>
      </NavLink>

      <div className="place-image-frame">
        <img
          className="place-image"
          src={require(`./../../../../assets/${result.image}`)}
          alt={result.name}
          title={result.name}
        />
      </div>
      <div className="place-description">
        <p className="place-name">{result.name}</p>
        <p className="place-adress">{result.adress}</p>
        <p className="place-short-description">{result.shortDescription}</p>
      </div>
    </div>
  )
}

export default FilteredPlaces
