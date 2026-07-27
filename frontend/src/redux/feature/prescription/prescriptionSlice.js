import { createSlice } from "@reduxjs/toolkit";
import {
    getMyPrescriptions,
    getDoctorPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
} from "./prescriptionThunk";

const initialState = {
    prescriptions: [],
    prescription: null,
    loading: false,
    error: null,
};

const prescriptionSlice = createSlice({
    name: "prescription",
    initialState,
    reducers: {
        clearSelectedPrescription: (state) => {
            state.prescription = null;
        },
        clearPrescriptionError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get My Prescriptions
            .addCase(getMyPrescriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyPrescriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.prescriptions = action.payload || [];
            })
            .addCase(getMyPrescriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Doctor Prescriptions
            .addCase(getDoctorPrescriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDoctorPrescriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.prescriptions = action.payload || [];
            })
            .addCase(getDoctorPrescriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Prescription By ID
            .addCase(getPrescriptionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPrescriptionById.fulfilled, (state, action) => {
                state.loading = false;
                state.prescription = action.payload;
            })
            .addCase(getPrescriptionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Prescription
            .addCase(createPrescription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPrescription.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.prescriptions.unshift(action.payload);
                    state.prescription = action.payload;
                }
            })
            .addCase(createPrescription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Prescription
            .addCase(updatePrescription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePrescription.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const index = state.prescriptions.findIndex(
                        (p) => p._id === action.payload._id
                    );
                    if (index !== -1) {
                        state.prescriptions[index] = action.payload;
                    }
                    if (state.prescription?._id === action.payload._id) {
                        state.prescription = action.payload;
                    }
                }
            })
            .addCase(updatePrescription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedPrescription, clearPrescriptionError } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
