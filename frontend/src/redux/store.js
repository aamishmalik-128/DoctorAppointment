import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice.js";
import doctorReducer from './feature/doctor/doctorSlice.js'
 const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
    },
});

export default store