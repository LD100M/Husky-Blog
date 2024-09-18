import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header"
import authService from './appwrite/auth'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

   // Retrieve the current user, if 
   // the data is found for the current
   // user in the backend, updaetes the 
   // user information in the front end
   // Otherwise, clears the user data and
   // sets his data to null to log him out
    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return !loading ? (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
          <div className="w-full block">
              <Header />
              <main>
                  <Outlet />
              </main>
          </div>
      </div>
  ) : 
  (
    <div className="flex items-center justify-center min-h-screen bg-purple-700">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-white"></div>
        <h1 className="mt-4 text-white text-2xl font-bold">Husky Blog</h1>
        <p className="text-white mt-2">Loading, please wait...</p>
      </div>
    </div>
  );
}

export default App
