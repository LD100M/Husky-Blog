import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    // if authentication is required and the user is not
    // authenticated, navigate to the login page
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } 
    // if authentication is not required and the user is
    // authenticated, navigate to the home page
    else if (!authentication && authStatus !== authentication){
      navigate("/")
    }
    // After checking the potential navigation, set the loader to
    // false(no loading is needed) and display the page
    setLoader(false)
  }, [authStatus, authentication, navigate])
  
  return loader ? null : <>{children}</>
}

export default Protected