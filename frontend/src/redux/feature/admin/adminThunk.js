import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminAPI from "./adminAPI";

export const getDashboardStats = createAsyncThunk(
    "admin/dashboard",
    async (_, thunkAPI) => {
        try {
            const { data } = await adminAPI.getDashboardStatsAPI();
            return data.stats;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to load dashboard"
            );
        }
    }
);

export const getPendingDoctors = createAsyncThunk(
    "admin/pendingDoctors",
    async (_, thunkAPI) => {
        try {
            const { data } = await adminAPI.getPendingDoctorsAPI();
            return data.doctors;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctors"
            );
        }
    }
);

export const approveDoctor = createAsyncThunk(
    "admin/approveDoctor",
    async (doctorId, thunkAPI) => {
        try {
            const { data } = await adminAPI.approveDoctorAPI(doctorId);
            return data.doctor;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Approval failed"
            );
        }
    }
);

export const rejectDoctor = createAsyncThunk(
    "admin/rejectDoctor",
    async (doctorId, thunkAPI) => {
        try {
            const { data } = await adminAPI.rejectDoctorAPI(doctorId);
            return data.doctor;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Rejection failed"
            );
        }
    }
);

export const getAllDoctors = createAsyncThunk(
    "admin/allDoctors",
    async (params, thunkAPI) => {
        try {
            const { data } = await adminAPI.getAllDoctorsAPI(params);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch doctors"
            );
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "admin/allUsers",
    async (params, thunkAPI) => {
        try {
            const { data } = await adminAPI.getAllUsersAPI(params);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);
export const blockUser = createAsyncThunk(
    "admin/blockUser",
    async (userId, thunkAPI) => {
        try {
            const { data } = await adminAPI.blockUserAPI(userId);
            return data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Block failed"
            );
        }
    }
);

export const unblockUser = createAsyncThunk(
    "admin/unblockUser",
    async (userId, thunkAPI) => {
        try {
            const { data } = await adminAPI.unblockUserAPI(userId);
            return data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Unblock failed"
            );
        }
    }
);