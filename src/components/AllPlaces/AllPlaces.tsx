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
import { IFavorites } from '../../types/FavoritePlaces'

interface LinkStateProps {
  places: IFoodPlaces[]
  favorites: IFavorites[]
}

const AllPlaces = ({ places, favorites }: LinkStateProps) => {
  return (
    <main className="all-places-container">
      <h1 className="all-places-heading">ALL PLACES</h1>

      <NavLink className="filter-link" exact to="/filter">
        <FontAwesomeIcon className="icon" icon={faSlidersH} />
        <p className="text">FILTER</p>
      </NavLink>

      <div className="all-places-wrapper">
        {places && places.map(place => <div key={place.id}>{<PlacesCards favorites={favorites} place={place} />}</div>)}
      </div>
    </main>
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
)(AllPlaces)
