import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"

// configure the redux store for 
// auth service 
const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})

export default store