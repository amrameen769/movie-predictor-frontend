import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {backendUrl} from "../constants";
import Banner from "./Banner";
import Row from "./Row";
import {setContentBasedData, setMoviesData} from "../store/slices/movieSlice";
import useFetch from "../hooks/useFetch";
import FeatureSelect from "./FeatureSelect";
import WatchList from "./WatchList";

export default function Launch() {
    const user = useSelector((state) => state.auth.user);
    const axios = require("axios").default;
    const [loggedInUser, setLoggedInUser] = useState(null);
    // const [recommendedMovies, setRecommendedMovies] = useState(null)
    const [loading, setLoading] = useState(true)
    const [contentLoading, setContentLoading] = useState(true)

    const movies = useSelector(state => state.movies.movies )
    const recommended_movies = movies.recommended_movies;
    const content_movies = useSelector(state => state.movies.content_movies )
    // const recommended_content_movies = content_movies.recommended_movies;
    const rating_counts = movies.rating_counts;
    const preferences = movies.preferences;
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        axios({
            url: backendUrl + "user/me",
            method: "GET",
            headers: {
                Authorization: "Bearer " + user?.access_token,
            },
        }).then(function (response) {
            setLoggedInUser(response.data);
        });
    }, [user]);

    useEffect(  () => {
        (async () => {
            setLoading(true)
            const data = await useFetch(backendUrl + "ai/recommend/user", "get", user?.access_token, null)
            dispatch((setMoviesData({
                movies: data
            })))
            setLoading(false)
        })();
    } , [])

    useEffect(() => {
        (async () => {
            setContentLoading(true)
            if(preferences){
                const contentBasedData = await useFetch(backendUrl+"ai/content-recommend?genres="+preferences["preferences"].join(" ").toLowerCase() + "&user_id=" + movies["userId"], "get", null, null)
                dispatch(setContentBasedData({
                    movies: contentBasedData
                }))
                setContentLoading(false)
            }
        })();
    }, [preferences])

    return (
        <>
            {loading ? (
                <div className={"block text-center mt-56"}>
                    <h1 className={"text-7xl"}>Loading...</h1>
                </div>
            ) : (
            <div className={"container mx-auto flex flex-col"}>
                <div className={"grid grid-cols-2 sticky top-14 z-[50]"}>
                    <FeatureSelect preferences={preferences} ratingCounts={rating_counts} />
                    <WatchList />
                </div>
                <Banner movie={recommended_movies && recommended_movies[0]}/>
                <Row movies={movies && movies["recommended_movies"]} title={"Movies for you..."} datatype={"collaborative"}/>
                {contentLoading ? (
                    <div className={"block text-center"}>
                        <h1 className={"text-4xl"}>Loading...</h1>
                    </div>
                ) : (
                    <Row movies={ content_movies && content_movies["recommended_movies"]} title={"Based on your preferences..."} datatype={"content"}/>
                )}
            </div>
        )}
        </>
    );
}