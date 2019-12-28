import React, { useState } from 'react'
import './filter.scss'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from '../../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlassMartiniAlt,
  faConciergeBell,
  faBreadSlice,
  faCookieBite,
  faMugHot,
  faHamburger,
} from '@fortawesome/free-solid-svg-icons'
import { animateScroll as scroll } from 'react-scroll'
import PlacesCards from '../../PlacesCards/PlacesCards'
import { IFavorites } from '../../../types/FavoritePlaces'

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
        <div onClick={() => filteredComponent('drinks')} className="filter-drinks-wrapper">
          <FontAwesomeIcon className="icon" icon={faGlassMartiniAlt} />
          <p className="filter-text">Drinks</p>
        </div>
        <div onClick={() => filteredComponent('dinner')} className="filter-dinner-wrapper">
          <FontAwesomeIcon className="icon" icon={faConciergeBell} />
          <p className="filter-text">Dinner</p>
        </div>
        <div onClick={() => filteredComponent('breakfast')} className="filter-breakfast-wrapper">
          <FontAwesomeIcon className="icon" icon={faBreadSlice} />
          <p className="filter-text">Breakfast</p>
        </div>
        <div onClick={() => filteredComponent('fika')} className="filter-fika-wrapper">
          <FontAwesomeIcon className="icon" icon={faMugHot} />
          <p className="filter-text">Fika</p>
        </div>
        <div onClick={() => filteredComponent('lunch')} className="filter-lunch-wrapper">
          <FontAwesomeIcon className="icon" icon={faHamburger} />
          <p className="filter-text">Lunch</p>
        </div>
        <div onClick={() => filteredComponent('snack')} className="filter-snack-wrapper">
          <FontAwesomeIcon className="icon" icon={faCookieBite} />
          <p className="filter-text">Snack</p>
        </div>
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
