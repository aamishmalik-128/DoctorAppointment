import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

export const registerDoctor= createAsyncThunk(
    "doctor/register",
    async(doctorData,thunkAPI)=>{
        try {
            const response = await api.post('/doctors/register',doctorData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)


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


export const createDoctorProfile = createAsyncThunk('doctor/createDoctorProfile',
    async(doctorData,thunkAPI)=>{
        try {
            const response = await api.post('/doctors/profile',doctorData)
            return response.data.doctor
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'failed to create profile')
        }
    }
)

export const updateDoctorProfile = createAsyncThunk(
    "doctor/updateDoctorProfile",
    async (doctorData, thunkAPI) => {
        try {
            const response = await api.patch(
                "/doctors/profile",
                doctorData
            );

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

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );

        }
    }
);

export const updateDoctorAvailability = createAsyncThunk(
    "doctor/updateAvailability",
    async (data, thunkAPI) => {
        try {

            const res = await api.patch(
                "/doctors/availability",
                data
            );

            return res.data.availability;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );

        }
    }
);