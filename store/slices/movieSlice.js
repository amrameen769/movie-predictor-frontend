import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const movieSlice = createSlice({
    name: "movie",
    initialState: {},
    reducers: {
        setMoviesData: (state, action) => {
            state.movies = action.payload.movies
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.movies = action.payload.movies
        }
    }
})

export const {setMoviesData} = movieSlice.actions;

export default movieSlice.reducer;