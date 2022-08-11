import {createSlice} from "@reduxjs/toolkit";

export const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        watchlist: []
    },
    reducers: {
        addMovieToWatchList: (state, action) => {
            state.watchlist.push(action.payload.movie)
        },
        removeMovieFromWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter(movie => movie.movieId !== action.payload.movieId)
        },
        setWatchList: (state, action) => {
            state.watchlist = action.payload.watchlist
        }
    }
})

export const { addMovieToWatchList, removeMovieFromWatchlist, setWatchList } = watchlistSlice.actions;

export default watchlistSlice.reducer;