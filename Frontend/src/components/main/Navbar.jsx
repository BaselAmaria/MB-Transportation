import React, { useEffect, useState } from 'react'
import classes from './Navbar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import logo from '../../assets/logo.png'
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { LuBadgeInfo } from "react-icons/lu";
import { CiDiscount1, CiMail, CiSquarePlus } from "react-icons/ci";
import { PiSignIn } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { postLogout } from '../../store/slices/authReducer'
import DropDown from '../ui/Dropdown'
import { BiLogOut } from 'react-icons/bi'
import { FaPlus, FaRegUser } from 'react-icons/fa'
import { getUser } from '../../store/slices/mainReducer'
import { useScrollContext } from '../../utils/ScrollProvider'
const Navbar = ({admin}) => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const {isAuth} = useSelector(state => state.auth)
    const {userData,userError} = useSelector(state => state.main)
    const dispatch = useDispatch()

    const handleLogOut = () => {
      dispatch(postLogout()).then((res) => {
        if(res?.payload?.detail === "Successfully logged out."){
          navigate('/')
          window.location.reload(true)
        } else {
          console.log(res?.payload?.detail)
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    const userInfo = () => {
      return (
        <div className={classes.userInfo}>
          <p>{userData?.username ? userData?.username : userData?.first_name + userData?.last_name}</p>
        </div>
      )
    }

    const { section1Ref, section2Ref } = useScrollContext();

    const scrollToSection = (sectionRef) => {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
      if(isAuth){
        dispatch(getUser())
        userError && console.log(userError)
      }
    }, []);

    if(toggle) {
        return (
            <nav className={classes.mobileNav}>
                <div className={classes.navheader}>
                  <Link to={admin ? '/admin' : '/'} onClick={() => setToggle(!toggle)} className={classes.logo}><img src={logo} alt='MD Transportation'/></Link>
                  <button onClick={() => setToggle(!toggle)}>
                      <IoMdClose/>
                  </button>
                </div>
                <div className={classes.navLinks}>
                  {!admin && <Link to={'/'} onClick={() => {setToggle(!toggle); scrollToSection(section1Ref)}}><LuBadgeInfo/> About</Link>}
                  {!admin && <Link to={'/'} onClick={() => {setToggle(!toggle); scrollToSection(section2Ref)}}><CiMail/> Contact</Link>}
                  {!admin && isAuth && <Link to={'/sales'} onClick={() => setToggle(!toggle)}><CiDiscount1 /> Hot Sales</Link>}
                  {!isAuth && <Link to={'/sales'} onClick={() => setToggle(!toggle)}><PiSignIn /> Sign In</Link>}
                  {isAuth && !admin && userData?.account_type == 'customer' && <Link to='/order/' onClick={() => setToggle(!toggle)}><CiSquarePlus /> Order</Link>}
                  {isAuth && !admin && <Link to='/profile' onClick={() => setToggle(!toggle)}><FaRegUser /> Profile</Link>}
                  {isAuth && admin &&  userInfo()}
                  {isAuth && <Link to='#' onClick={handleLogOut}><BiLogOut /> Logout</Link>}
                </div>
            </nav>
        )
    }
    
  return (
    <nav className={classes.nav}>
        <Link to={admin ? '/admin' : '/'} className={classes.logo}><img src={logo} alt='MD Transportation'/></Link>
        {!admin && <div className={classes.navLinks}>
        <Link to={'/'} onClick={() => scrollToSection(section1Ref)}><LuBadgeInfo/> About</Link>
        <Link to={'/'} onClick={() => scrollToSection(section2Ref)}><CiMail/> Contact</Link>
        {isAuth && <Link to={'/sales'}><CiDiscount1 /> Hot Sales</Link>}
        {isAuth && userData?.account_type == 'customer' && <Link to='/order/create'><CiSquarePlus /> Order</Link>}

        </div>}
        {isAuth && 
          <DropDown header={userInfo()}>
            <Link to={userData?.account_type == 'supplier' ? '/supplier-profile' :
             userData?.account_type == 'customer' ? '/profile' :
              admin && '/admin'}><FaRegUser /> Profile</Link>
            <Link to='#' onClick={handleLogOut}><BiLogOut /> Logout</Link>
          </DropDown>
        }
        
        
        {!isAuth && <div className={classes.actions}>
            <Button to={'/auth'} text={'Sign In'} sm/>
        </div>}
        <button className={classes.toggleButton} onClick={() => setToggle(!toggle)}>
          <MdOutlineMenu/>
        </button>
    </nav>
  )
}

export default Navbar