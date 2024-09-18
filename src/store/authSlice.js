import { createSlice } from "@reduxjs/toolkit";

// status is a boolean value indicates whether
// the user is authenticated
// userData shows the content of the post
const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // function sets the authentication status 
        // to true and sets the user data to 
        // whatever value that gets passed in
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },

        // function sets the authentication status 
        // to false and clears the user data
        logout: (state) => {
            state.status = false;
            state.userData = null
        }
    }
})


export const { login, logout } = authSlice.actions

export default authSlice.reducer