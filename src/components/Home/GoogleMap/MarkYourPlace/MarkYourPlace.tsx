import React from 'react'
import './markYourPlace.scss'

const MarkYourPlace = (props: any) => {
  const { color, name, id } = props
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
      />
      <div className="pulse" />
    </div>
  )
}

export default MarkYourPlace
