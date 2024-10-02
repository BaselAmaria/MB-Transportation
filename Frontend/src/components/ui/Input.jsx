import React from 'react'
import classes from './Input.module.scss'
const Input = ({type="text",placeholder,onChange,value,error}) => {
  return (
    <div className={classes.input}>
        <input id='input' value={value} style={{border:error && '1px solid red'}} onChange={onChange} type={type} placeholder={placeholder}/>
    </div>
  )
}

export default Input