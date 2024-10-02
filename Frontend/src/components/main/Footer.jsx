import React from 'react'
import classes from './Footer.module.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { PiSignIn } from 'react-icons/pi'
import { FaFacebook, FaInstagram, FaUserPlus } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { CiDiscount1, CiMail } from 'react-icons/ci'
import { LuBadgeInfo } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { useScrollContext } from '../../utils/ScrollProvider'
const Footer = ({admin}) => {
  const {isAuth} = useSelector(state => state.auth)


  const { section1Ref, section2Ref } = useScrollContext();

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className={classes.footer}>
      <Link to={admin ? '/admin' : '/'}><img src={logo} alt='MD Transportation'/></Link>
      {!admin && <div className={classes.footerLinks}>
          <p>Quick Links</p>
          <Link to={'/'} onClick={() => scrollToSection(section1Ref)}><LuBadgeInfo/> About</Link>
          <Link to={'/'} onClick={() => scrollToSection(section2Ref)}><CiMail/> Contact</Link>
          <Link to={'/sales'}><CiDiscount1/> Hot Deals</Link>
      </div>}
     {!isAuth && <div className={classes.footerLinks}>
          <p>Quick Links</p>
          <Link to={'/auth'}><PiSignIn /> Sign In</Link>
          <Link to={'/auth/sign-up'}><FaUserPlus /> Sign Up</Link>
      </div>}
    
      <div className={classes.footerLinks}>
          <p>Social Links</p>
          <div className={classes.social}>
            <Link to={'#'}><FaFacebook /></Link>
            <Link to={'#'}><FaInstagram /></Link>
            <Link to={'#'}><BsTwitterX /></Link>
        </div>
      </div>
     
    </footer>
  )
}

export default Footer