import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/public/Home.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Login from './Pages/auth/Login.jsx'
import LoginDoctor from './Pages/auth/LoginDoctor.jsx'
import { getCurrentUser } from './redux/feature/auth/authThunk.js'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import PublicRoute from './components/auth/PublicRoute.jsx'
import Register from './Pages/auth/RegisterPatient.jsx'
import RegisterDoctor from './Pages/auth/RegisterDoctor.jsx'
import Profile from './Pages/patient/Profile.jsx'
import EditProfile from './Pages/patient/EditProfile.jsx'
import ChangePassword from './Pages/patient/ChangePassword.jsx'
import MyAppointments from './Pages/patient/MyAppointments.jsx'
import AppointmentDetails from './Pages/patient/AppointmentDetails.jsx'
import MyPrescriptions from './Pages/patient/MyPrescriptions.jsx'
import PrescriptionDetails from './Pages/patient/PrescriptionDetails.jsx'

import DashboardLayout from './components/doctor/DashboardLayout.jsx'
import DashboardHome from './Pages/doctor/DashboardHome.jsx'
import DoctorProfile from './Pages/doctor/DoctorProfile.jsx'
import DoctorEditProfile from './Pages/doctor/EditProfile.jsx'
import Availability from './Pages/doctor/Availability.jsx'
import DoctorAppointments from './Pages/doctor/MyAppointments.jsx'
import DoctorPrescriptions from './Pages/doctor/MyPrescriptions.jsx'
import CreatePrescription from './Pages/doctor/CreatePrescription.jsx'
import EditPrescription from './Pages/doctor/EditPrescription.jsx'
import Patients from './Pages/doctor/Patients.jsx'
import Settings from './Pages/doctor/Settings.jsx'

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

        {/* Public Guest Routes */}
        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/doctor/login"
            element={<LoginDoctor />}
          />
          <Route
            path="/login/doctor"
            element={<LoginDoctor />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/doctor/register"
            element={<RegisterDoctor />}
          />
        </Route>

        {/* Protected Patient Routes (Doctors strictly blocked) */}
        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/profile/edit"
            element={<EditProfile />}
          />
          <Route
            path="/profile/change-password"
            element={<ChangePassword />}
          />
          <Route
            path="/my-appointments"
            element={<MyAppointments />}
          />
          <Route
            path="/appointments"
            element={<MyAppointments />}
          />
          <Route
            path="/appointments/:id"
            element={<AppointmentDetails />}
          />
          <Route
            path="/my-prescriptions"
            element={<MyPrescriptions />}
          />
          <Route
            path="/prescriptions"
            element={<MyPrescriptions />}
          />
          <Route
            path="/prescriptions/:id"
            element={<PrescriptionDetails />}
          />
        </Route>

        {/* Protected Doctor Routes (Patients strictly blocked) */}
        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path='/doctor' element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path='profile' element={<DoctorProfile />} />
            <Route path='profile/edit' element={<DoctorEditProfile />} />
            <Route path='availability' element={<Availability />} />
            <Route path='appointments' element={<DoctorAppointments />} />
            <Route path='appointments/:id' element={<AppointmentDetails />} />
            <Route path='prescriptions' element={<DoctorPrescriptions />} />
            <Route path='prescriptions/create' element={<CreatePrescription />} />
            <Route path='prescriptions/:id' element={<PrescriptionDetails />} />
            <Route path='prescriptions/:id/edit' element={<EditPrescription />} />
            <Route path='patients' element={<Patients />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App