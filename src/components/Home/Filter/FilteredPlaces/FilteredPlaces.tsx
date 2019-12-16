import React from 'react'
import './filteredPlaces.scss'

interface IProps {
  result: any
}

const FilteredPlaces = ({ result }: IProps) => {
  return (
    <>
      <li>{result.name}</li>
      <li>{result.adress}</li>
    </>
  )
}

export default FilteredPlaces
