import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {}
    },
    reducers: {
        setAccessData: (state, action) => {
            state.user = action.payload.user
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.access_token = action.payload.access_token
            state.token_type = action.payload.token_type
        }
    }
})

export const {setAccessData} = authSlice.actions;

export default authSlice.reducer;