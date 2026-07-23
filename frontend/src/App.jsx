
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/public/Home.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Login from './Pages/auth/Login.jsx'
import { getCurrentUser, refreshToken } from './redux/feature/auth/authThunk.js'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import PublicRoute from './components/auth/PublicRoute.jsx'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (err) {
        console.log("Auth check failed:", err);
      }
    };

    initializeAuth();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route element={<PublicRoute />}>

          <Route
            path="/login"
            element={<Login />}
          />

          {/* <Route
            path="/register"
            element={<Register />}
          /> */}

        </Route>

        <Route element={<ProtectedRoute />}>

          <Route
            path="/"
            element={<Home />}
          />

          {/* <Route
            path="/profile"
            element={<Profile />}
          /> */}

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App