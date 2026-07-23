import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data?.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Registration failed"
            );
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            console.log("Thunk Called");
            const response = await api.post('/auth/login', userData);
            if (response.data?.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Login failed"
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("/auth/logout");
            localStorage.removeItem("accessToken");
        } catch (error) {
            localStorage.removeItem("accessToken");
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Logout failed"
            );
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/auth/me");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Failed to fetch user"
            );
        }
    }
);

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, thunkAPI) => {
        try {
            const response = await api.post("/auth/refresh-token");
            if (response.data?.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Token refresh failed"
            );
        }
    }
);