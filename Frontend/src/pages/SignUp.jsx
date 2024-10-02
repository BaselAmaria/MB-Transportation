import React, { useEffect, useState } from 'react'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'
import Button from '../components/ui/Button'
import classes from './SignUp.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'
import { FaUser } from 'react-icons/fa'
import { BsFillBuildingsFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { postSignUp } from '../store/slices/authReducer'
import { emailIsInvalid, uppercaseFirstLetter } from '../utils/HelperFunctions'
const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {signUpLoading,signUpError} = useSelector(state => state.auth)
  const [accountType, setAccountType] = useState(null)
  const [disabled,setDisabled] = useState(true)
  const [error,setError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [errorText,setErrorText] = useState('')
  const [user,setUser] = useState({
    email:'',
    password1:'',
    password2:'',
    first_name:'',
    last_name:'',
    phone:'',
    address:'',
    company:'',
    account_type:''
  })

  const handleCustomer = () => {
    setAccountType('customer')
    setUser({
      email:'',
      password1:'',
      password2:'',
      first_name:'',
      last_name:'',
      phone:'',
      address:'',
      company:'',
      account_type:'customer'
    })
    setError(false)
    setPasswordError(false)
  }
  const handleSupplier = () => {
    setAccountType('supplier')
    setUser({
      email:'',
      password1:'',
      password2:'',
      first_name:'',
      last_name:'',
      phone:'',
      address:'',
      company:'',
      account_type:'supplier'
    })
    setError(false)
    setPasswordError(false)
  }
  const handleReset = () => {
    setAccountType(null)
    setUser({
      email:'',
      password1:'',
      password2:'',
      first_name:'',
      last_name:'',
      phone:'',
      address:'',
      company:'',
      account_type:''
    })
    setError(false)
    setPasswordError(false)
  }

  const handleSignUp = () => {
    dispatch(postSignUp(user)).then((res) => {
      if(res?.payload?.access){
        window.location.reload(true)
        navigate('/')
      } else {
        res?.payload?.email && setErrorText(res?.payload?.email)
      }
    })
  }


  useEffect(() => {
    if(user?.email?.length > 3 && emailIsInvalid(user?.email)){
      setError(true)
    } else {
      setError(false)
    }
    if(user?.password1?.length < 8){
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
    <section className={classes.signup}>
        <h2>Sign Up</h2>
        {!accountType && <h3>Choose Account Type</h3>}
        {!accountType && <div className={classes.accountType}>
            <button onClick={handleCustomer} className={accountType === 'customer' ? classes.active : null}><FaUser /> Customer</button>
            <button onClick={handleSupplier} className={accountType === 'supplier' ? classes.active : null}><BsFillBuildingsFill /> Supplier</button>
        </div>}
       {accountType === 'customer' && <div className={classes.form}>
          <button className={classes.goBack} onClick={handleReset}><GoArrowLeft /> Back</button>
          <Input value={user.first_name} onChange={(e) => setUser({...user,first_name:uppercaseFirstLetter(e.target.value)})} placeholder='First Name' />
          <Input value={user.last_name} onChange={(e) => setUser({...user,last_name:uppercaseFirstLetter(e.target.value)})} placeholder='Last Name' />
          <Input value={user.phone} onChange={(e) => setUser({...user,phone:e.target.value})} placeholder='Phone Number' />
          <Input value={user.address} onChange={(e) => setUser({...user,address:uppercaseFirstLetter(e.target.value)})} placeholder='Address' />
          <Input type='email' value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} placeholder='Email' />
          <PasswordInput value={user.password1} onChange={(e) => setUser({...user,password1:e.target.value,password2:e.target.value})} placeholder='Password' />
          <Button disabled={disabled || signUpLoading} loading={signUpLoading} sm text={'Sign Up'} onClick={handleSignUp}/>
          <p>Already have an account? <Link to={'/auth'}>Sign In</Link></p>
          {signUpError && <p className='error'>{errorText}</p>}
        </div>}
       {accountType === 'supplier' && <div className={classes.form}>
          <button className={classes.goBack} onClick={handleReset}><GoArrowLeft /> Back</button>
          <Input value={user.first_name} onChange={(e) => setUser({...user,first_name:uppercaseFirstLetter(e.target.value)})} placeholder='First Name' />
          <Input value={user.last_name} onChange={(e) => setUser({...user,last_name:uppercaseFirstLetter(e.target.value)})} placeholder='Last Name' />
          <Input value={user.phone} onChange={(e) => setUser({...user,phone:e.target.value})} placeholder='Phone Number' />
          <Input value={user.company} onChange={(e) => setUser({...user,company:uppercaseFirstLetter(e.target.value)})} placeholder='Company Name' />
          <Input type='email' value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} placeholder='Email' />
          <PasswordInput value={user.password1} onChange={(e) => setUser({...user,password1:e.target.value,password2:e.target.value})} placeholder='Password' />
          <Button disabled={disabled || signUpLoading} loading={signUpLoading} sm text={'Sign Up'} onClick={handleSignUp}/>
          <p>Already have an account? <Link to={'/auth'}>Sign In</Link></p>
          {signUpError && <p className='error'>{errorText}</p>}
        </div>}
    </section>
  )
}

export default SignUp