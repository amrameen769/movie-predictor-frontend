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
            if(action.payload.datatype === "content"){
                const new_ratings = state.content_movies.ratings
                const index = state.content_movies.ratings.findIndex(rating => rating.movieId === action.payload.movieId)

                new_ratings[index] = action.payload.rating
                state.content_movies = {
                    ...state.content_movies,
                    ratings: new_ratings
                }
            } else {
                const new_ratings = state.movies.ratings
                const index = state.movies.ratings.findIndex(rating => rating.movieId === action.payload.movieId)

                new_ratings[index] = action.payload.rating
                state.movies = {
                    ...state.movies,
                    ratings: new_ratings
                }
            }
        },
        setContentBasedData: (state, action) => {
            state.content_movies = action.payload.movies
        },
        setPreferencesData: (state, action) => {
            state.preferences = action.payload.preferences
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.movies = action.payload.movies
        }
    }
})

export const {setMoviesData, setRatingData, setContentBasedData, setPreferencesData} = movieSlice.actions;

export default movieSlice.reducer;