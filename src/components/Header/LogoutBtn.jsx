import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth.js"
import {logout } from "../../store/authSlice.js"

function LogoutBtn() {
    const dispatch = useDispatch()

    // Clear the user from the data
    // base and clears the user data
    // in the front end
    const lougoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={lougoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn