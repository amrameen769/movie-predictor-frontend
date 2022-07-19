import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        access_token: "",
        token_type: ""
    },
    reducers: {
        setAccessData: (state, action) => {
            state.access_token = action.payload.access_token
            state.token_type = action.payload.token_type
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