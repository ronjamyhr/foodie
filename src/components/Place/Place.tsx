import React, { useState } from 'react'
import './place.scss'
import { IFoodPlaces } from '../../types/FoodPlaces'
import { AppState } from '../..'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'

const Place = ({ places }: LinkStateProps) => {
  const { url } = useParams()

  return (
    <div className="place-container">
      <h1 className="place-heading">PLACE</h1>
      {places &&
        places
          .filter(place => place.url === url)
          .map(place => (
            <div className="place-wrapper" key={place.id}>
              <div className="place-image-frame">
                <img
                  className="place-image"
                  src={require(`./../../assets/${place.image}`)}
                  alt={place.name}
                  title={place.name}
                />
              </div>
              <div className="place-description">
                <div className="place-info-wrapper">
                  <p className="place-name">{place.name}</p>
                  <p className="place-adress">{place.adress}</p>
                  <p className="place-phone-number">{place.phoneNumber}</p>
                </div>
                <div className="place-text-wrapper">
                  <p className="place-short-description">{place.shortDescription}</p>
                  <p className="place-long-description">{place.longDescription}</p>
                </div>
              </div>
            </div>
          ))}
      <div className="go-to-menu-button">
        <a href="https://www.google.com/">
          <button className="button"> GO TO MENU </button>
        </a>
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
)(Place)

// export default Place
