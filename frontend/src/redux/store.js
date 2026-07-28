import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice.js";
import doctorReducer from "./feature/doctor/doctorSlice.js";
import appointmentReducer from "./feature/appointment/appointmentSlice.js";
import prescriptionReducer from "./feature/prescription/prescriptionSlice.js";
import adminReducer from "./feature/admin/adminSlice.js";
import paymentReducer from "./payment/paymentSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        appointment: appointmentReducer,
        prescription: prescriptionReducer,
        admin: adminReducer,
        payment: paymentReducer,
    },
});

export default store;