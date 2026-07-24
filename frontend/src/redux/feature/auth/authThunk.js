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

export const updateUserProfile = createAsyncThunk(
    "auth/updateUserProfile",
    async (formData, thunkAPI) => {
        try {
            const response = await api.put("/profile", formData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Failed to update profile"
            );
        }
    }
);

export const updateUserAvatar = createAsyncThunk(
    "auth/updateUserAvatar",
    async (avatarFile, thunkAPI) => {
        try {
            const data = new FormData();
            data.append("avatar", avatarFile);
            const response = await api.put("/profile/avatar", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Failed to upload avatar"
            );
        }
    }
);

export const deleteAvatar = createAsyncThunk(
    "auth/deleteAvatar",
    async (_, thunkAPI) => {
        try {
            const response = await api.delete("/profile/avatar");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Failed to delete avatar"
            );
        }
    }
);


export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (passwordData, thunkAPI) => {
        try {
            const response = await api.put(
                "/profile/change-password",
                passwordData
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || "Failed to change password"
            );
        }
    }
);