import React from 'react'
import './divLink.scss'

interface IPlacesCardsProps {
  children: any
  style: any
}

const DivLink = ({ children, style }: IPlacesCardsProps) => {
  return (
    <div style={style} className="button-style">
      {children}
    </div>
  )
}

export default DivLink
