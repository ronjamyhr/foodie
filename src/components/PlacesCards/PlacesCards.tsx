import React from 'react'
import './placesCards.scss'
import { NavLink } from 'react-router-dom'
import { bindActionCreators, compose, Dispatch } from 'redux'
import { markYourFavoritePlace } from '../../store/actions/favorites'
import { connect } from 'react-redux'
import { IUser } from '../../types/User'
import { IFavorites } from '../../types/FavoritePlaces'

interface IProps {
  place: any
  favorites: IFavorites[]
  markYourFavoritePlace: (favoritesData: any) => void
  inloggedUser: string
}

const PlacesCards = ({ place, markYourFavoritePlace, inloggedUser, favorites }: IProps) => {
  const markFavoritePlace = () => {
    const favorite = true
    const placeName = place.name
    const username = inloggedUser

    markYourFavoritePlace({ favorite, placeName, username })
  }

  const favoritePlaces =
    favorites &&
    favorites
      .filter(favorite => favorite.username === inloggedUser && favorite.placeName === place.name)
      .map(favorite => <div key={favorite.id}></div>)

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

      <div>
        {favoritePlaces && favoritePlaces.length ? (
          <p>HJÄRTAT</p>
        ) : (
          <button className="button" onClick={() => markFavoritePlace()}>
            hjärta ställe
          </button>
        )}
      </div>
    </article>
  )
}

const mapStateToProps = (state: any): IUser => ({
  inloggedUser: state.firebase.auth.displayName,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  markYourFavoritePlace: bindActionCreators(markYourFavoritePlace, dispatch),
})

export default compose<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlacesCards)
)
