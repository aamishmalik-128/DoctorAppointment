import { createAsyncThunk } from "@reduxjs/toolkit";

import api from '../../../services/axios.js'
// Get My Notifications
export const getMyNotifications = createAsyncThunk(
    "notification/getMyNotifications",
    async (params = {}, thunkAPI) => {
        try {
            const response = await api.get(
                "/notifications",
                {
                    params,
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch notifications"
            );
        }
    }
);

// Mark One As Read
export const markAsRead = createAsyncThunk(
    "notification/markAsRead",
    async (notificationId, thunkAPI) => {
        try {
            const response = await api.patch(
                `/notifications/${notificationId}/read`
            );

            return {
                notificationId,
                ...response.data,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to mark notification as read"
            );
        }
    }
);

// Mark All As Read
export const markAllAsRead = createAsyncThunk(
    "notification/markAllAsRead",
    async (_, thunkAPI) => {
        try {
            const response = await api.patch(
                "/notifications/read-all"
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to mark all notifications as read"
            );
        }
    }
);

// Delete Notification
export const deleteNotification = createAsyncThunk(
    "notification/deleteNotification",
    async (notificationId, thunkAPI) => {
        try {
            await api.delete(
                `/notifications/${notificationId}`
            );

            return notificationId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete notification"
            );
        }
    }
);