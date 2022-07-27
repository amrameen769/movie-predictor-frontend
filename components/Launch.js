import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {backendUrl} from "../constants";
import Banner from "./Banner";
import Row from "./Row";
import {setMoviesData} from "../store/slices/movieSlice";

export default function Launch() {
    const user = useSelector((state) => state.auth.user);
    const axios = require("axios").default;
    const [loggedInUser, setLoggedInUser] = useState(null);
    // const [recommendedMovies, setRecommendedMovies] = useState(null)
    const [loading, setLoading] = useState(true)

    const movies = useSelector(state => state.movies.movies )
    const recommended_movies = movies.recommended_movies;
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        axios({
            url: backendUrl + "user/me",
            method: "GET",
            headers: {
                Authorization: "Bearer " + user.access_token,
            },
        }).then(function (response) {
            setLoggedInUser(response.data);
            setLoading(false)
        });
    }, [user]);

    useEffect( () => {
        setLoading(true)
        if (movies && Object.keys(movies).length === 0) {
            axios({
                url: backendUrl + "ai/recommend/user",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + user.access_token,
                },
            }).then(function (response) {
                dispatch(setMoviesData({
                    movies: response.data
                }))
                setLoading(false)
            })
        }
    } , [])

    return (
        <>
            {loading ? (
                <div className={"block"}>
                    <h1 className={"text-7xl"}>Loading...</h1>
                </div>
            ) : (
            <div className={"container mx-auto flex flex-col"}>
                <Banner movie={recommended_movies && recommended_movies[0]}/>
                <Row movies={movies && movies["recommended_movies"]}/>
            </div>
        )}
        </>
    );
}