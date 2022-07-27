import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import movieReducer from "./slices/movieSlice"
import {createWrapper} from "next-redux-wrapper";

const initialState = {}

const middleware = [thunk]

const makeStore = () => configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer
    },
    devTools: true,
    middleware
})

export const wrapper = createWrapper(makeStore);
