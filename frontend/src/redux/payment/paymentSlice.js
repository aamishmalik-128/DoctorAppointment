import { createSlice } from "@reduxjs/toolkit";
import { createPaymentIntent, confirmPayment } from "./paymentThunk";

const initialState = {
    loading: false,
    confirming: false,
    clientSecret: "",
    paymentIntentId: "",
    amount: 0,
    paymentSuccess: false,
    confirmedAppointment: null,
    error: null,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        resetPaymentState: (state) => {
            state.loading = false;
            state.confirming = false;
            state.clientSecret = "";
            state.paymentIntentId = "";
            state.amount = 0;
            state.paymentSuccess = false;
            state.confirmedAppointment = null;
            state.error = null;
        },
        clearPaymentError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // createPaymentIntent
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.paymentSuccess = false;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.clientSecret = action.payload.clientSecret;
                state.paymentIntentId = action.payload.paymentIntentId;
                state.amount = action.payload.amount || 0;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // confirmPayment
            .addCase(confirmPayment.pending, (state) => {
                state.confirming = true;
                state.error = null;
            })
            .addCase(confirmPayment.fulfilled, (state, action) => {
                state.confirming = false;
                state.paymentSuccess = true;
                state.confirmedAppointment = action.payload.appointment;
            })
            .addCase(confirmPayment.rejected, (state, action) => {
                state.confirming = false;
                state.error = action.payload;
            });
    },
});

export const { resetPaymentState, clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;