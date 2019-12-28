import React from 'react'
import './placesCards.scss'
import { NavLink } from 'react-router-dom'
import { bindActionCreators, compose, Dispatch } from 'redux'
import { markYourFavoritePlace, removeFavoritePlace } from '../../store/actions/favorites'
import { connect } from 'react-redux'
import { IUser } from '../../types/User'
import { IFavorites } from '../../types/FavoritePlaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  place: any
  favorites: IFavorites[]
  markYourFavoritePlace: (favoritesData: any) => void
  removeFavoritePlace: (id: string) => void
  inloggedUser: string
}

const PlacesCards = ({ place, markYourFavoritePlace, inloggedUser, favorites, removeFavoritePlace }: IProps) => {
  const markFavoritePlace = () => {
    const favorite = true
    const placeName = place.name
    const username = inloggedUser

    markYourFavoritePlace({ favorite, placeName, username })
  }

  const unMarkFavoritePlace = (id: string) => {
    removeFavoritePlace(id)
  }

  const favoritePlaces =
    favorites &&
    favorites
      .filter(favorite => favorite.username === inloggedUser && favorite.placeName === place.name)
      .map(favorite => (
        <FontAwesomeIcon
          key={favorite.id}
          onClick={() => unMarkFavoritePlace(favorite.id)}
          className="filled-icon"
          icon={faHeart}
        />
      ))

  return (
    <article className="places-card-wrapper">
      <div className="place-image-frame">
        <img
          className="place-image"
          src={require(`./../../assets/${place.image}`)}
          alt={`${place.name} inspirational food and/or drinks`}
          title={place.name}
        />
      </div>
      <div className="place-description">
        <NavLink className="place-link" exact to={`/place/${place.url}`}>
          <p className="place-name">{place.name}</p>
        </NavLink>
        <p className="place-adress">{place.adress}</p>
        <p className="place-short-description">{place.shortDescription}</p>
      </div>

      {favoritePlaces && favoritePlaces.length ? (
        <div className="filled-marker-wrapper">{favoritePlaces}</div>
      ) : (
        <div className="unfilled-marker-wrapper">
          <FontAwesomeIcon onClick={() => markFavoritePlace()} className="unfilled-icon" icon={unfilledHeart} />
        </div>
      )}
    </article>
  )
}

const mapStateToProps = (state: any): IUser => ({
  inloggedUser: state.firebase.auth.displayName,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  markYourFavoritePlace: bindActionCreators(markYourFavoritePlace, dispatch),
  removeFavoritePlace: bindActionCreators(removeFavoritePlace, dispatch),
})

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlacesCards)
)
