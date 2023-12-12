import React from 'react'
import classes from './CardsWrapper.module.css'

const CardsWrapper = ({children}) => {
  return (
    <div className={classes.wrapper}>
    {children}
    </div>
  )
}

export default CardsWrapper