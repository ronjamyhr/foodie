import React from 'react'
import './allPlaces.scss'
import { NavLink } from 'react-router-dom'
import { IFoodPlaces } from '../../types/FoodPlaces'
import { AppState } from '../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import PlacesCards from '../PlacesCards/PlacesCards'

const AllPlaces = ({ places }: LinkStateProps) => {
  return (
    <div className="all-places-container">
      <h1 className="all-places-heading">ALL PLACES</h1>

      <NavLink className="filter-link" exact to="/filter">
        <FontAwesomeIcon className="icon" icon={faSlidersH} />
        <p className="text">FILTER</p>
      </NavLink>

      <div className="all-places-wrapper">
        {places && places.map(place => <div key={place.id}>{<PlacesCards result={place} />}</div>)}
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
)(AllPlaces)
