import React, { useState, useRef } from 'react'
import './filter.scss'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from '../../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import FilteredPlaces from './FilteredPlaces/FilteredPlaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlassMartiniAlt,
  faConciergeBell,
  faBreadSlice,
  faCookieBite,
  faMugHot,
  faHamburger,
} from '@fortawesome/free-solid-svg-icons'

const Filter = ({ places }: LinkStateProps) => {
  const [filtered, setFiltered] = useState<boolean>(false)
  const [filterType, setFilterType] = useState<string>('')

  const resultsRef: any = useRef(null)

  const filteredComponent = (type: string) => {
    window.scrollTo({
      behavior: 'smooth',
      top: resultsRef.current.offsetTop,
    })
    setFiltered(true)
    setFilterType(type)
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

      <div className="filter-result-container" ref={resultsRef}>
        <h2 className="filter-result-heading">{filterType}</h2>
        {filtered &&
          places
            .filter(place => place.type === filterType)
            .map(place => <div key={place.id}>{<FilteredPlaces result={place} />}</div>)}
      </div>
    </div>
  )
}

interface LinkStateProps {
  places: IFoodPlaces[]
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    places: state.firestore.ordered.foodplaces,
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: 'foodplaces' }])
)(Filter)
