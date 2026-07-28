import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// Patient: Get My Prescriptions
export const getMyPrescriptions = createAsyncThunk(
    "prescription/getMyPrescriptions",
    async (params = {}, thunkAPI) => {
        try {
            const response = await api.get("/prescriptions", { params });
            return response.data.prescriptions;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch prescriptions"
            );
        }
    }
);

// Doctor: Get Doctor Prescriptions
export const getDoctorPrescriptions = createAsyncThunk(
    "prescription/getDoctorPrescriptions",
    async (params = {}, thunkAPI) => {
        try {
            const response = await api.get("/prescriptions/doctor", { params });
            return response.data.prescriptions;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctor prescriptions"
            );
        }
    }
);

// Get Prescription By ID
export const getPrescriptionById = createAsyncThunk(
    "prescription/getPrescriptionById",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/prescriptions/${id}`);
            return response.data.prescription;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch prescription details"
            );
        }
    }
);

// Doctor: Create Prescription
export const createPrescription = createAsyncThunk(
    "prescription/createPrescription",
    async (prescriptionData, thunkAPI) => {
        try {
            const response = await api.post("/prescriptions", prescriptionData);
            return response.data.prescription;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create prescription"
            );
        }
    }
);

// Doctor: Update Prescription
export const updatePrescription = createAsyncThunk(
    "prescription/updatePrescription",
    async ({ prescriptionId, updateData }, thunkAPI) => {
        try {
            const response = await api.patch(`/prescriptions/${prescriptionId}`, updateData);
            return response.data.prescription;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update prescription"
            );
        }
    }
);
