import React from 'react'
import classes from './Error.module.scss'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <section className={classes.container}>
        <h3>Error 404</h3>
        <p>This page seems to be not found!</p>
        <Link to='/' className={classes.link}>Go back to Home</Link>
    </section>
  )
}

export default Error