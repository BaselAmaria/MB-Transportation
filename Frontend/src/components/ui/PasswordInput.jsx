import React, { useState } from 'react'
import classes from './PasswordInput.module.scss'
import { FaRegEye,FaEyeSlash } from "react-icons/fa";
const PasswordInput = ({type="password",placeholder,onChange,error,value}) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
  return (
    <div className={classes.input}>
        <input style={{border:error && '1px solid red'}} value={value} id='passowrdInput' onChange={onChange} type={showPassword ? 'text' : type} placeholder={placeholder}/>
        <button onClick={handleShowPassword}>
            {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
        </button>
    </div>
  )
}

export default PasswordInput