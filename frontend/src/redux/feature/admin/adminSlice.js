import { createSlice } from "@reduxjs/toolkit";
import {
    getDashboardStats,
    getPendingDoctors,
    approveDoctor,
    rejectDoctor,
    getAllDoctors,
    getAllUsers,
    blockUser,
    unblockUser,
} from "./adminThunk";

const initialState = {
    loading: false,
    error: null,

    dashboardStats: null,

    pendingDoctors: [],

    doctors: [],
    totalDoctors: 0,
    currentDoctorPage: 1,
    totalDoctorPages: 1,

    users: [],
    totalUsers: 0,
    currentUserPage: 1,
    totalUserPages: 1,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {
        clearAdminError: (state) => {
            state.error = null;
        },

        clearAdminState: () => initialState,
    },

    extraReducers: (builder) => {
        builder
            // Get Dashboard Stats
            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardStats = action.payload;
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Pending Doctors
            .addCase(getPendingDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPendingDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingDoctors = action.payload || [];
            })
            .addCase(getPendingDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Approve Doctor
            .addCase(approveDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(approveDoctor.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.pendingDoctors = state.pendingDoctors.filter(
                        (doctor) => doctor._id !== action.payload._id
                    );
                    const index = state.doctors.findIndex(
                        (doctor) => doctor._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.doctors[index] = action.payload;
                    }
                }
            })
            .addCase(approveDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reject Doctor
            .addCase(rejectDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectDoctor.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.pendingDoctors = state.pendingDoctors.filter(
                        (doctor) => doctor._id !== action.payload._id
                    );
                    const index = state.doctors.findIndex(
                        (doctor) => doctor._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.doctors[index] = action.payload;
                    }
                }
            })
            .addCase(rejectDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Doctors
            .addCase(getAllDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload.doctors || [];
                state.totalDoctors = action.payload.totalDoctors || 0;
                state.currentDoctorPage = action.payload.currentPage || 1;
                state.totalDoctorPages = action.payload.totalPages || 1;
            })
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users || [];
                state.totalUsers = action.payload.totalUsers || 0;
                state.currentUserPage = action.payload.currentPage || 1;
                state.totalUserPages = action.payload.totalPages || 1;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Block User
            .addCase(blockUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const index = state.users.findIndex(
                        (user) => user._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.users[index] = action.payload;
                    }
                }
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Unblock User
            .addCase(unblockUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unblockUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const index = state.users.findIndex(
                        (user) => user._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.users[index] = action.payload;
                    }
                }
            })
            .addCase(unblockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAdminError, clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;