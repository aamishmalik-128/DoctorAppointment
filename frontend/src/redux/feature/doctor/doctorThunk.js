import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

export const registerDoctor = createAsyncThunk(
    "doctor/registerDoctor",
    async (doctorData, thunkAPI) => {
        try {
            const response = await api.post("/doctors/register", doctorData);
            if (response.data?.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Doctor registration failed"
            );
        }
    }
);
