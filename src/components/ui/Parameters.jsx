import React from 'react'
import classes from './Parameters.module.css'

const Parameters = ({name, data}) => {
  return (
    <div className={classes.parameters}>
        <p>{name}</p>
        <p>{data}</p>
    </div>
  )
}

export default Parameters