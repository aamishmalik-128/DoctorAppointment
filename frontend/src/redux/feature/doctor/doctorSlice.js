import { createSlice } from "@reduxjs/toolkit";
import {
    registerDoctor,
    getDoctorProfile,
    createDoctorProfile,
    updateDoctorProfile,
    getDoctorAvailability,
    updateDoctorAvailability,
    fetchPublicDoctors,
    getPublicDoctorById,
} from "./doctorThunk";

const initialState = {
    loading: false,
    error: null,
    success: false,
    doctorProfile: null,
    profileCompleted: false,
    availability: [],

    // Public doctors listing state
    publicDoctors: [],
    selectedDoctor: null,
    totalPublicDoctors: 0,
    currentPublicPage: 1,
    totalPublicPages: 1,
};

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        clearDoctorState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        clearSelectedDoctor(state) {
            state.selectedDoctor = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Public Fetch Doctors
            .addCase(fetchPublicDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPublicDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.publicDoctors = action.payload.doctors || [];
                state.totalPublicDoctors = action.payload.totalDoctors || 0;
                state.currentPublicPage = action.payload.currentPage || 1;
                state.totalPublicPages = action.payload.totalPages || 1;
            })
            .addCase(fetchPublicDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Public Get Doctor By ID
            .addCase(getPublicDoctorById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPublicDoctorById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDoctor = action.payload;
            })
            .addCase(getPublicDoctorById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register Doctor
            .addCase(registerDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerDoctor.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload;
            })

            // Get Doctor Profile
            .addCase(getDoctorProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDoctorProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.doctorProfile = action.payload;
                state.profileCompleted = true;
            })
            .addCase(getDoctorProfile.rejected, (state, action) => {
                state.loading = false;
                if (action.payload === "Doctor Profile not found") {
                    state.profileCompleted = false;
                    state.doctorProfile = null;
                } else {
                    state.error = action.payload;
                }
            })

            // Create Doctor Profile
            .addCase(createDoctorProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDoctorProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profileCompleted = true;
                state.doctorProfile = action.payload;
            })
            .addCase(createDoctorProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Doctor Profile
            .addCase(updateDoctorProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDoctorProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.doctorProfile = action.payload;
            })
            .addCase(updateDoctorProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Availability
            .addCase(getDoctorAvailability.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDoctorAvailability.fulfilled, (state, action) => {
                state.loading = false;
                state.availability = action.payload || [];
            })
            .addCase(getDoctorAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Availability
            .addCase(updateDoctorAvailability.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDoctorAvailability.fulfilled, (state, action) => {
                state.loading = false;
                state.availability = action.payload || [];
            })
            .addCase(updateDoctorAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearDoctorState, clearSelectedDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;