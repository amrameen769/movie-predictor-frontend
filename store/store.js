import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import {createWrapper} from "next-redux-wrapper";

const initialState = {}

const middleware = [thunk]

const makeStore = () => configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true,
    middleware
})

export const wrapper = createWrapper(makeStore);
