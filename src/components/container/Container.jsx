import React from 'react'

// Css applied for the overall design 
export default function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}

