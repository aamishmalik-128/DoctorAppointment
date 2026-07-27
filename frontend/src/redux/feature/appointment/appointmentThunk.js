import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// Patient: Book Appointment
export const bookAppointment = createAsyncThunk(
    "appointment/bookAppointment",
    async (payload, thunkAPI) => {
        try {
            const response = await api.post("/appointment", payload);
            return response.data.appointment;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to book appointment"
            );
        }
    }
);

// Patient: Get My Appointments
export const getMyAppointments = createAsyncThunk(
    "appointment/getMyAppointments",
    async (params = {}, thunkAPI) => {
        try {
            const response = await api.get("/appointment", { params });
            return response.data.appointments;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch appointments"
            );
        }
    }
);

// Get Appointment By ID
export const getAppointmentById = createAsyncThunk(
    "appointment/getAppointmentById",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/appointment/${id}`);
            return response.data.appointment;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch appointment details"
            );
        }
    }
);

// Patient: Cancel Appointment
export const cancelAppointment = createAsyncThunk(
    "appointment/cancelAppointment",
    async ({ appointmentId, reason }, thunkAPI) => {
        try {
            const response = await api.patch(`/appointment/${appointmentId}/cancel`, { reason });
            return response.data.appointment;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to cancel appointment"
            );
        }
    }
);

// Doctor: Get Doctor Appointments
export const getDoctorAppointments = createAsyncThunk(
    "appointment/getDoctorAppointments",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/appointment/appointments/");
            return response.data.appointments;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctor appointments"
            );
        }
    }
);

// Doctor: Confirm Appointment
export const confirmAppointment = createAsyncThunk(
    "appointment/confirmAppointment",
    async (appointmentId, thunkAPI) => {
        try {
            const response = await api.patch(
                `/appointment/appointments/${appointmentId}/confirm`
            );
            return response.data.appointment;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to confirm appointment"
            );
        }
    }
);

// Doctor: Reject Appointment
export const rejectAppointment = createAsyncThunk(
    "appointment/rejectAppointment",
    async ({ appointmentId, reason }, thunkAPI) => {
        try {
            const response = await api.patch(
                `/appointment/appointments/${appointmentId}/reject`,
                { reason }
            );
            return response.data.appointment;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to reject appointment"
            );
        }
    }
);

// Doctor: Complete Appointment
export const completeAppointment = createAsyncThunk(
    "appointment/completeAppointment",
    async (appointmentId, thunkAPI) => {
        try {
            const response = await api.patch(
                `/appointment/appointments/${appointmentId}/complete`
            );
            return response.data.appointment;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to complete appointment"
            );
        }
    }
);