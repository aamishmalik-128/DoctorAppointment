import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice.js";
import doctorReducer from './feature/doctor/doctorSlice.js'
import appointmentReducer from './feature/appointment/appointmentSlice.js'
 const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        appointment: appointmentReducer,
    },
});

export default store