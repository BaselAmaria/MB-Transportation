import React from 'react'
import { FaRegStar,FaStar } from "react-icons/fa";
const Star = ({filled, onClick}) => {
  return (
    <span
        onClick={onClick}
        style={{
          cursor: 'pointer',
          color:'gold',
          fontSize: '1.5rem',
          marginRight:'0.25rem'
        }}
      >
        {filled ? <FaStar/> : <FaRegStar/>}
      </span>
  )
}

export default Star
