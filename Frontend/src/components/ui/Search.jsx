import React from 'react'
import classes from './Search.module.scss'
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
const Search = ({bg,search,setSearch,handleSearch,handleResetSearch,placeholder}) => {
  return (
    <div className={classes.search} style={{backgroundColor:bg && bg}}>
        <CiSearch/>
        <input onKeyDown={(e) => handleSearch(e)} placeholder={placeholder || 'Search'} value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
        {search?.length > 0 && <IoMdClose onClick={handleResetSearch}/> }
    </div>
  )
}

export default Search