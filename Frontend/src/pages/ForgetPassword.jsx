import React, { useEffect, useState } from 'react'
import classes from './SignIn.module.scss'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/ui/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { postLogin, resetPassword } from '../store/slices/authReducer'
const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {resetPasswordError,resetPasswordLoading} = useSelector(state => state.auth)
  const [disabled,setDisabled] = useState(true)
  const [resetDisabled,setResetDisabled] = useState(true)
  const [errorText,setErrorText] = useState('')
  const [current,setCurrent] = useState('phone')
  const [code,setCode] = useState('')
  const [codeDisabled,setCodeDisabled] = useState(true)
  const [user,setUser] = useState({
    phone:'',
    new_password:'',
    confirm_password:'',
    code:''
  })


  const handleResetPassword = () => {
    dispatch(resetPassword({
        phone: user.phone,
        new_password: user.new_password,
    })).then((res) => {
      if(res?.payload?.message === 'Password reset successfully.'){
        navigate('/auth')
      } else {
        if(res?.payload?.non_field_errors) {
          setErrorText(res?.payload?.non_field_errors[0])
        }
      }
    })
  }

  useEffect(() => {
    if(user?.phone){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    if(user?.new_password && user?.confirm_password && user?.new_password === user?.confirm_password){
      setResetDisabled(false)
    } else {
        setResetDisabled(true)
    }
    if(user?.code){
      setCodeDisabled(false)
    } else {
        setCodeDisabled(true)
    }
  }, [user])


  
  return (
    <section className={classes.signIn}>
        <h2>Reset Password</h2>
       {current === 'phone' && <div className={classes.form}>
          <p>Type Your Phone Number</p>
          <Input type='text' value={user.phone} onChange={(e) => setUser({...user,phone:e.target.value})} placeholder='Phone Number' />
          <Button onClick={() => setCurrent('code')} disabled={disabled} sm text={'Next'}/>
        </div>}
       {current === 'code' && <div className={classes.form}>
          <p>Type the verification code</p>
          <Input type='text' value={user.code} onChange={(e) => setUser({...user,code:e.target.value})} placeholder='Code' />
          <Button onClick={() => setCurrent('final')} disabled={codeDisabled} sm text={'Next'}/>
        </div>}
       {current === 'final' && <div className={classes.form}>
          <PasswordInput value={user?.new_password} onChange={(e) => setUser({...user,new_password:e.target.value})} placeholder='New Password' />
          <PasswordInput value={user?.confirm_password} onChange={(e) => setUser({...user,confirm_password:e.target.value})} placeholder='Confirm New Password' />
          <Button onClick={handleResetPassword} disabled={disabled || resetPasswordLoading} loading={resetPasswordLoading} sm text={'Reset Password'}/>
          {resetPasswordError && <p className='error'>{errorText}</p>}
        </div>}
    </section>
  )
}

export default ForgetPassword