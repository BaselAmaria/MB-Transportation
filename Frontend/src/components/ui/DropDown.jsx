import React, { useCallback, useEffect, useRef } from 'react'
import classes from './DropDown.module.scss'
import { MdKeyboardArrowDown } from "react-icons/md";
import { OutsideClick } from '../../utils/HelperFunctions';
const DropDown = ({children,header}) => {
    const [open, setOpen] = React.useState(false)
    const handleDropDown = (e) => {
        e.stopPropagation();
        setOpen(!open)
    }
    const buttonRef = useRef(null);
    const itemRef = useRef(null);
    OutsideClick(itemRef,buttonRef,() => setOpen(false))
  return (
    <div className={classes.container} ref={buttonRef}  onClick={(e) => handleDropDown(e)}>
        {header}
        <MdKeyboardArrowDown className={classes.arrow}  style={{transform:open && 'rotate(180deg)'}}/> 
        {open && <div className={classes.dropDownBody} ref={itemRef}>
            {children.map((child,index) => (
                <div key={index} className={classes.dropDownItem}>
                    {child}
                </div>
            ))}
        </div>}
    </div>
  )
}

export default DropDown