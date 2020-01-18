import React from 'react'
import './divLink.scss'

interface IProps {
  children: any
  style: any
}

const DivLink = ({ children, style }: IProps) => {
  return (
    <div style={style} className="button-style">
      {children}
    </div>
  )
}

export default DivLink
