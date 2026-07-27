import { createSlice } from "@reduxjs/toolkit";
import {
    registerDoctor,
    getDoctorProfile,
    createDoctorProfile,
    updateDoctorProfile,
    getDoctorAvailability,
    updateDoctorAvailability,
} from "./doctorThunk";

const initialState = {
    loading: false,
    error: null,
    success: false,
    doctorProfile: null,
    profileCompleted: false,
    availability: [],
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
    },
    extraReducers: (builder) => {
        builder
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

export const { clearDoctorState } = doctorSlice.actions;

export default doctorSlice.reducer;