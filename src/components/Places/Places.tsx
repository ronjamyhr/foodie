import React from 'react'
import './places.scss'
import { NavLink } from 'react-router-dom'

const Places = () => {
  return (
    <div className="places-container">
      <h1>Places</h1>
      <NavLink className="filter-link" exact to="/filter">
        filtrera
      </NavLink>
    </div>
  )
}

export default Places
