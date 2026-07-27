import { createSlice } from "@reduxjs/toolkit";
import { registerDoctor } from "./doctorThunk";

const initialState = {

    loading: false,

    error: null,

    success: false,

};

const doctorSlice = createSlice({

    name: "doctor",

    initialState,

    reducers: {

        clearDoctorState(state) {

            state.loading = false;
            state.error = null;
            state.success = false;

        }

    },

    extraReducers: (builder) => {

        builder

        .addCase(registerDoctor.pending,(state)=>{

            state.loading = true;

            state.error = null;

            state.success = false;

        })

        .addCase(registerDoctor.fulfilled,(state)=>{

            state.loading = false;

            state.success = true;

        })

        .addCase(registerDoctor.rejected,(state,action)=>{

            state.loading = false;

            state.error = action.payload?.message;

        });

    }

});

export const {

    clearDoctorState

}=doctorSlice.actions;

export default doctorSlice.reducer;