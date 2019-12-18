import React from 'react'
import './places.scss'
import { NavLink } from 'react-router-dom'
import { IFoodPlaces } from '../../types/FoodPlaces'
import { AppState } from '../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import FilteredPlaces from './Filter/FilteredPlaces/FilteredPlaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'

const Places = ({ places }: LinkStateProps) => {
  return (
    <div className="places-container">
      <h1 className="places-heading">PLACES</h1>

      <NavLink className="filter-link" exact to="/filter">
        <FontAwesomeIcon className="icon" icon={faSlidersH} />
        <p className="text">FILTER</p>
      </NavLink>

      <div className="places-wrapper">
        {places && places.map(place => <div key={place.id}>{<FilteredPlaces result={place} />}</div>)}
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
)(Places)
