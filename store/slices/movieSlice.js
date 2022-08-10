import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

export const movieSlice = createSlice({
    name: "movie",
    initialState: {},
    reducers: {
        setMoviesData: (state, action) => {
            state.movies = action.payload.movies
        },
        setRatingData: (state, action) => {
            const new_ratings = state.movies.ratings
            const index = state.movies.ratings.findIndex(rating => rating.movieId === action.payload.movieId)

            new_ratings[index] = action.payload.rating
            state.movies = {
                ...state.movies,
                ratings: new_ratings
            }
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.movies = action.payload.movies
        }
    }
})

export const {setMoviesData, setRatingData} = movieSlice.actions;

export default movieSlice.reducer;