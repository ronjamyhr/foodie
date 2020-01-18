import React, { useState } from 'react'
import './filter.scss'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from '../../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animateScroll as scroll } from 'react-scroll'
import PlacesCards from '../../PlacesCards/PlacesCards'
import { IFavorites } from '../../../types/FavoritePlaces'
import { filterDefinitions } from './filterArray'

interface LinkStateProps {
  places: IFoodPlaces[]
  favorites: IFavorites[]
}

const Filter = ({ places, favorites }: LinkStateProps) => {
  const [filtered, setFiltered] = useState<boolean>(false)
  const [filterType, setFilterType] = useState<string>('')

  const filteredComponent = (type: string) => {
    setFiltered(true)
    setFilterType(type)
    scroll.scrollTo(500)
  }

  return (
    <div className="filter-container">
      <h1 className="filter-heading">FILTER</h1>

      <div className="filter-icons-wrapper">
        {filterDefinitions &&
          filterDefinitions.map(filter => (
            <div key={filter.id} onClick={() => filteredComponent(filter.type)} className={filter.className}>
              <FontAwesomeIcon className="icon" icon={filter.icon} />
              <p className="filter-text">{filter.type}</p>
            </div>
          ))}
      </div>

      <div className="filter-result-container">
        <h2 className="filter-result-heading">{filterType}</h2>
        {filtered &&
          places
            .filter(place => place.type === filterType)
            .map(place => <div key={place.id}>{<PlacesCards favorites={favorites} place={place} />}</div>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  places: state.firestore.ordered.foodplaces,
  favorites: state.firestore.ordered.favorites,
})

export default compose<any>(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: 'foodplaces' }, { collection: 'favorites' }])
)(Filter)
