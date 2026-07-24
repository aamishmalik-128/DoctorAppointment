import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, getCurrentUser, refreshToken, updateUserProfile, updateUserAvatar, deleteAvatar } from './authThunk.js'
const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: false,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            //register
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //login
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                console.log(action.payload);
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            //logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null,
                    state.accessToken = null,
                    state.isAuthenticated = false,
                    state.loading = false
                state.error = null
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.isAuthenticated = true
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false
            })
            .addCase(refreshToken.pending, (state) => {

                state.loading = true;

            })

            .addCase(refreshToken.fulfilled, (state, action) => {

                state.loading = false;

                state.accessToken = action.payload.accessToken;

            })

            .addCase(refreshToken.rejected, (state) => {

                state.loading = false;

                state.accessToken = null;

                state.user = null;

                state.isAuthenticated = false;

            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.user) {
                    state.user = { ...state.user, ...action.payload.user };
                }
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.user) {
                    state.user = { ...state.user, ...action.payload.user };
                }
            })
            .addCase(deleteAvatar.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.user) {
                    state.user = { ...state.user, ...action.payload.user };
                }
            })

    }
});



export default authSlice.reducer;