import React from 'react'
import huskyBlog from '../assets/huskyBlog.png';

// Logo for the app
function Logo({maxWidth = "100px", maxHeight = "100%" }) {
  return (
    <img src={huskyBlog}  style={{ maxWidth, maxHeight, objectFit: 'contain' }} alt='Logo placeholder'/>
  )
}

export default Logo