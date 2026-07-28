import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice.js";
import doctorReducer from "./feature/doctor/doctorSlice.js";
import appointmentReducer from "./feature/appointment/appointmentSlice.js";
import prescriptionReducer from "./feature/prescription/prescriptionSlice.js";
import adminReducer from "./feature/admin/adminSlice.js";
import paymentReducer from "./feature/payment/paymentSlice.js";
import notificationReducer from "./feature/notification/notificationSlice.js";
import chatReducer from "./feature/chat/chatSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        appointment: appointmentReducer,
        prescription: prescriptionReducer,
        admin: adminReducer,
        payment: paymentReducer,
        notification: notificationReducer,
        chat: chatReducer,
    },
});

export default store;