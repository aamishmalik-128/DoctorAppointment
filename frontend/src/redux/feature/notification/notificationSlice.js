import { createSlice } from "@reduxjs/toolkit";
import {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "./notificationThunk";

const initialState = {
    notifications: [],
    unreadCount: 0,

    loading: false,
    error: null,

    currentPage: 1,
    totalPages: 1,
    totalNotifications: 0,
};

const notificationSlice = createSlice({
    name: "notification",

    initialState,

    reducers: {
        clearNotificationState: (state) => {
            state.loading = false;
            state.error = null;
        },

        resetNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            state.currentPage = 1;
            state.totalPages = 1;
            state.totalNotifications = 0;
        },
    },

    extraReducers: (builder) => {

        // ===========================
        // GET MY NOTIFICATIONS
        // ===========================

        builder
            .addCase(getMyNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMyNotifications.fulfilled, (state, action) => {
                state.loading = false;

                state.notifications =
                    action.payload.notifications;

                state.unreadCount =
                    action.payload.unreadCount;

                state.currentPage =
                    action.payload.currentPage;

                state.totalPages =
                    action.payload.totalPages;

                state.totalNotifications =
                    action.payload.totalNotifications;
            })

            .addCase(getMyNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ===========================
        // MARK AS READ
        // ===========================

        builder
            .addCase(markAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(markAsRead.fulfilled, (state, action) => {
                state.loading = false;

                const notification =
                    state.notifications.find(
                        (item) =>
                            item._id ===
                            action.payload.notificationId
                    );

                if (notification && !notification.isRead) {
                    notification.isRead = true;
                    state.unreadCount--;
                }
            })

            .addCase(markAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ===========================
        // MARK ALL AS READ
        // ===========================

        builder
            .addCase(markAllAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(markAllAsRead.fulfilled, (state) => {
                state.loading = false;

                state.notifications.forEach((notification) => {
                    notification.isRead = true;
                });

                state.unreadCount = 0;
            })

            .addCase(markAllAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ===========================
        // DELETE NOTIFICATION
        // ===========================

        builder
            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.loading = false;

                const deletedNotification =
                    state.notifications.find(
                        (item) =>
                            item._id === action.payload
                    );

                if (
                    deletedNotification &&
                    !deletedNotification.isRead
                ) {
                    state.unreadCount--;
                }

                state.notifications =
                    state.notifications.filter(
                        (item) =>
                            item._id !== action.payload
                    );

                state.totalNotifications--;
            })

            .addCase(deleteNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearNotificationState,
    resetNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;