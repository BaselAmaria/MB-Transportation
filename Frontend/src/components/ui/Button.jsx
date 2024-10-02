import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Button.module.scss'
import { CircularProgress } from '@mui/material'
const Button = ({to,sm,text,onClick,icon,iconLeft,disabled,loading,warning}) => {
   if(to) {
         return (
              <Link disabled={disabled} className={classes.link} to={to} style={{padding:sm && '0.5rem 1.5rem',backgroundColor: warning && 'var(--redColor)'}}> {icon && iconLeft} {loading ? <CircularProgress size={'1rem'} color="inherit" /> : text} {icon && !iconLeft}</Link>
         )
   } else {
            return (
                <button disabled={disabled} className={classes.button} onClick={onClick} style={{padding:sm && '0.5rem 1.5rem',backgroundColor: warning && 'var(--redColor)'}}>  {icon && iconLeft} {loading ? <CircularProgress size={'1rem'} color="inherit" /> : text} {icon && !iconLeft}</button>
            )
   }
 
}

export default Button