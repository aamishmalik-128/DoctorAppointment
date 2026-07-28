import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

export const createPaymentIntent = createAsyncThunk(
    "payment/createIntent",
    async (appointmentId, thunkAPI) => {
        try {
            const { data } = await api.post("/payments/create-intent", {
                appointmentId,
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to initialize payment."
            );
        }
    }
);

export const confirmPayment = createAsyncThunk(
    "payment/confirmPayment",
    async ({ appointmentId, paymentIntentId }, thunkAPI) => {
        try {
            const { data } = await api.patch("/payments/confirm", {
                appointmentId,
                paymentIntentId,
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to confirm payment."
            );
        }
    }
);