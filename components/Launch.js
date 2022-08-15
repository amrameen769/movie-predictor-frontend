import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {backendUrl} from "../constants";
import Banner from "./Banner";
import Row from "./Row";
import {setContentBasedData, setMoviesData, setPreferencesData} from "../store/slices/movieSlice";
import useFetch from "../hooks/useFetch";
import FeatureSelect from "./FeatureSelect";
import WatchList from "./WatchList";
import {getSession} from "next-auth/react";

export default function Launch() {
    const user = useSelector((state) => state.auth.user);
    const axios = require("axios").default;
    const [loggedInUser, setLoggedInUser] = useState(null);
    // const [recommendedMovies, setRecommendedMovies] = useState(null)
    const [loading, setLoading] = useState(true)
    const [contentLoading, setContentLoading] = useState(true)
    const [collabLoading, setCollabLoading] = useState(true)

    const movies = useSelector(state => state.movies.movies)
    const recommended_movies = movies.recommended_movies;
    const content_movies = useSelector(state => state.movies.content_movies)
    // const recommended_content_movies = content_movies.recommended_movies;
    const rating_counts = movies.rating_counts;
    const preferences = useSelector(state => state.movies.preferences)
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

    useEffect(() => {
        (async () => {
            setCollabLoading(true)
            const data = await useFetch(backendUrl + "ai/recommend/user", "get", user?.access_token, null)
            dispatch((setMoviesData({
                movies: data
            })))
            setCollabLoading(false)
        })();
    }, [])

    useEffect(() => {
        if (user) {
            (async () => {
                setLoading(true)
                const data = await useFetch(backendUrl + "ai/get-preferences", "get", user?.access_token, null)
                dispatch((setPreferencesData({
                    preferences: data
                })))
                setLoading(false)
            })();
        }
    }, [user])

    useEffect(() => {
        (async () => {
            setContentLoading(true)
            if (preferences) {
                const contentBasedData = await useFetch(backendUrl + "ai/content-recommend?genres=" + preferences["preferences"].join(" ").toLowerCase() + "&user_id=" + preferences["userId"], "get", null, null)
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
                <div className={"block text-center mt-5"}>
                    <h1 className={"text-7xl"}>Loading...</h1>
                </div>
            ) : (
                <div className={"container mx-auto flex flex-col"}>
                    <div className={"grid grid-cols-2 sticky top-14 z-[50]"}>
                        <FeatureSelect preferences={preferences} ratingCounts={rating_counts}/>
                        <WatchList/>
                    </div>
                    {contentLoading || collabLoading ? (
                        <div className={"block text-center mt-5"}>
                            <h1 className={"text-7xl"}>Loading...</h1>
                        </div>
                    ) : (
                        <>
                            <Banner movie={recommended_movies && recommended_movies[0]}/>
                            <Row movies={movies && movies["recommended_movies"]} title={"Movies for you..."}
                                 datatype={"collaborative"}/>
                            <Row movies={content_movies && content_movies["recommended_movies"]}
                                 title={"Based on your preferences..."} datatype={"content"}/>
                        </>
                    )}
                </div>
            )}
        </>
    );
}