import React, { useEffect, useState } from 'react'
import classes from './SignIn.module.scss'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/ui/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { emailIsInvalid } from '../utils/HelperFunctions'
import { postLogin } from '../store/slices/authReducer'
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loginLoading,loginError} = useSelector(state => state.auth)
  const [disabled,setDisabled] = useState(true)
  const [error,setError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [errorText,setErrorText] = useState('')
  const [user,setUser] = useState({
    email:'',
    password:'',
  })


  const handleLogin = () => {
    dispatch(postLogin(user)).then((res) => {
      if(res?.payload?.access){
        window.location.reload(true)
        navigate('/')
      } else {
        if(res?.payload?.non_field_errors) {
          setErrorText(res?.payload?.non_field_errors[0])
        }
      }
    })
  }

  useEffect(() => {
    if(user?.email?.length > 3 && emailIsInvalid(user?.email)){
      setError(true)
    } else {
      setError(false)
    }
    if(!user?.password?.length){
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }, [user])

  useEffect(() => {
    if(!error && !passwordError){
      setDisabled(false)
    } else {
     setDisabled(true)
    }
  }, [user,passwordError,error])

  
  return (
    <section className={classes.signIn}>
        <h2>Sign In</h2>
        <div className={classes.form}>
          <Input type='email' value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} placeholder='Email' />
          <PasswordInput value={user.password} onChange={(e) => setUser({...user,password:e.target.value})} placeholder='Password' />
          <p><Link to={'/auth/reset-password'}>Forget Password</Link></p>
          <Button onClick={handleLogin} disabled={disabled || loginLoading} loading={loginLoading} sm text={'Sign In'}/>
          <p>Don't have an account? <Link to={'/auth/sign-up'}>Sign Up</Link></p>
          {loginError && <p className='error'>{errorText}</p>}
        </div>
    </section>
  )
}

export default SignIn