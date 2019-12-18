import React from 'react'
import './navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="places-wrapper">
        <NavLink
          activeStyle={{
            fontWeight: 700,
          }}
          className="fork-knife-text"
          exact
          to="/allplaces"
        >
          <FontAwesomeIcon className="fork-knife-icon" icon={faUtensils} />
          <br />
          All places
        </NavLink>
      </div>
      <div className="logo-wrapper">
        <NavLink className="logo-link" exact to="/">
          <img
            className="foodie-logo"
            src={require('./../../assets/logo-foodie.png')}
            alt="Logotype of Foodie"
            title="Foodie logo"
          />
        </NavLink>
      </div>
      <div className="user-wrapper">
        <NavLink
          activeStyle={{
            fontWeight: 700,
          }}
          className="user-text"
          exact
          to="/user"
        >
          <FontAwesomeIcon className="user-icon" icon={faUser} />
          <br />
          User
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
