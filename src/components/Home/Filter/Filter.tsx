import React, { useState, useRef } from 'react'
import './filter.scss'
import { IFoodPlaces } from '../../../types/FoodPlaces'
import { AppState } from '../../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import FilteredPlaces from './FilteredPlaces/FilteredPlaces'

const Filter = ({ places }: LinkStateProps) => {
  const [filtered, setFiltered] = useState<boolean>(false)
  const [filterType, setFilterType] = useState<string>('')

  const filteredComponent = (type: string) => {
    window.scrollBy({
      top: 100,
      left: 100,
      behavior: 'smooth',
    })

    setFiltered(true)
    setFilterType(type)
  }

  const scrollUpButton = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="filter-container">
        <div onClick={() => filteredComponent('drinks')} className="filter-drinks-wrapper">
          Drinks
        </div>
        <div onClick={() => filteredComponent('dinner')} className="filter-dinner-wrapper">
          Dinner
        </div>
        <div className="filter-breakfast-wrapper">Breakfast</div>
        <div className="filter-fika-wrapper">Fika</div>
        <div className="filter-lunch-wrapper">Lunch</div>
        <div className="filter-snack-wrapper">Snack</div>
      </div>
      <button className="philipsLights-button-up" onClick={() => scrollUpButton()}>
        UP
      </button>
      {filtered &&
        places
          .filter(place => place.type === filterType)
          .map(place => <ul key={place.id}>{<FilteredPlaces result={place} />}</ul>)}
    </>
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
