import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// Public: Fetch approved doctors list
export const fetchPublicDoctors = createAsyncThunk(
    "doctor/fetchPublicDoctors",
    async (params = {}, thunkAPI) => {
        try {
            const response = await api.get("/doctors", { params });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctors"
            );
        }
    }
);

// Public: Get Doctor Details by ID
export const getPublicDoctorById = createAsyncThunk(
    "doctor/getPublicDoctorById",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/doctors/${id}`);
            return response.data.doctor;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctor details"
            );
        }
    }
);

export const registerDoctor = createAsyncThunk(
    "doctor/register",
    async (doctorData, thunkAPI) => {
        try {
            const response = await api.post('/doctors/register', doctorData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const getDoctorProfile = createAsyncThunk(
    "doctor/getDoctorProfile",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/doctors/profile");
            return response.data.doctor;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctor profile."
            );
        }
    }
);

export const createDoctorProfile = createAsyncThunk(
    'doctor/createDoctorProfile',
    async (doctorData, thunkAPI) => {
        try {
            const response = await api.post('/doctors/profile', doctorData);
            return response.data.doctor;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create profile');
        }
    }
);

export const updateDoctorProfile = createAsyncThunk(
    "doctor/updateDoctorProfile",
    async (doctorData, thunkAPI) => {
        try {
            const response = await api.patch("/doctors/profile", doctorData);
            return response.data.doctor;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update profile."
            );
        }
    }
);

export const getDoctorAvailability = createAsyncThunk(
    "doctor/getAvailability",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/doctors/availability");
            return res.data.availability;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateDoctorAvailability = createAsyncThunk(
    "doctor/updateAvailability",
    async (data, thunkAPI) => {
        try {
            const res = await api.patch("/doctors/availability", data);
            return res.data.availability;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);