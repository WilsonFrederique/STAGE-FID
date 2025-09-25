import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearachBox = () => {
  return (
    <div className='searchBox position-relative d-flex align-items-center'>
        <IoSearch className='me-2' />
        <input type="text" placeholder='Rechercher ...' />
    </div>
  )
}

export default SearachBox