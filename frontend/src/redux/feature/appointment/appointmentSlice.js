import { createSlice } from "@reduxjs/toolkit";
import {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    getAppointmentById,
    cancelAppointment,
    confirmAppointment,
    rejectAppointment,
    completeAppointment,
} from "./appointmentThunk";

const initialState = {
    appointments: [],
    appointment: null,
    loading: false,
    error: null,
};

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        clearSelectedAppointment: (state) => {
            state.appointment = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // Book Appointment
            .addCase(bookAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookAppointment.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.appointments.unshift(action.payload);
                    state.appointment = action.payload;
                }
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get My Appointments (Patient)
            .addCase(getMyAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload || [];
            })
            .addCase(getMyAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Doctor Appointments
            .addCase(getDoctorAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDoctorAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload || [];
            })
            .addCase(getDoctorAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Appointment By ID
            .addCase(getAppointmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAppointmentById.fulfilled, (state, action) => {
                state.loading = false;
                state.appointment = action.payload;
            })
            .addCase(getAppointmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Cancel Appointment
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.appointments.findIndex(
                        (a) => a._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.appointments[index] = action.payload;
                    }
                    if (state.appointment?._id === action.payload._id) {
                        state.appointment = action.payload;
                    }
                }
            })

            // Confirm Appointment
            .addCase(confirmAppointment.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.appointments.findIndex(
                        (a) => a._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.appointments[index] = action.payload;
                    }
                    if (state.appointment?._id === action.payload._id) {
                        state.appointment = action.payload;
                    }
                }
            })

            // Reject Appointment
            .addCase(rejectAppointment.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.appointments.findIndex(
                        (a) => a._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.appointments[index] = action.payload;
                    }
                    if (state.appointment?._id === action.payload._id) {
                        state.appointment = action.payload;
                    }
                }
            })

            // Complete Appointment
            .addCase(completeAppointment.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.appointments.findIndex(
                        (a) => a._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.appointments[index] = action.payload;
                    }
                    if (state.appointment?._id === action.payload._id) {
                        state.appointment = action.payload;
                    }
                }
            });
    },
});

export const { clearSelectedAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;