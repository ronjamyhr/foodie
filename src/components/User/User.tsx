import React from 'react'
import './user.scss'
import firebase from 'firebase/app'
import { IUser } from '../../types/User'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { IFoodPlaces } from '../../types/FoodPlaces'
import { IFavorites } from '../../types/FavoritePlaces'
import { firestoreConnect } from 'react-redux-firebase'
import PlacesCards from '../PlacesCards/PlacesCards'

const User = ({ inloggedUser, places, favorites }: LinkStateProps) => {
  const firstCharacterOfInloggedUser = inloggedUser.charAt(0)
  return (
    <main className="user-container">
      <h1 className="user-heading">USER</h1>
      <div className="card">
        <div className="user-info-wrapper">
          <div className="user-icon-background">
            <p className="user-icon">{firstCharacterOfInloggedUser}</p>
          </div>

          <div className="user-text">
            <h2 className="user-title">Logged in as</h2>
            <p className="user-name">{inloggedUser}</p>
          </div>
        </div>

        <div className="favorite-places-wrapper">
          <h2 className="my-favorites">My favorites</h2>

          <div className="all-places-wrapper">
            {favorites &&
              favorites
                .filter(favorite => favorite.favorite)
                .map(favorite => (
                  <div key={favorite.id}>
                    {places &&
                      places
                        .filter(place => place.name === favorite.placeName)
                        .map(place => (
                          <div key={place.id}>
                            <PlacesCards favorites={favorites} place={place} />
                          </div>
                        ))}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="sign-out-button">
        <NavLink className="link" exact to="/" onClick={() => firebase.auth().signOut()}>
          LOG OUT
        </NavLink>
      </div>
    </main>
  )
}

interface LinkStateProps {
  places: IFoodPlaces[]
  favorites: IFavorites[]
  inloggedUser: string
}

const mapStateToProps = (state: any): LinkStateProps => {
  return {
    inloggedUser: state.firebase.auth.displayName,
    places: state.firestore.ordered.foodplaces,
    favorites: state.firestore.ordered.favorites,
  }
}

export default compose<any>(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: 'foodplaces' }, { collection: 'favorites' }])
)(User)
