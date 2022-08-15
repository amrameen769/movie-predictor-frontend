import {useSelector} from "react-redux";
import Header from "../../../components/Header";
import {useRouter} from "next/router";
import Banner from "../../../components/Banner";
import Head from "next/head";
import {useEffect, useRef, useState} from "react";
import {EmojiHappyIcon} from "@heroicons/react/outline";
import useFetch from "../../../hooks/useFetch";
import {backendUrl} from "../../../constants";
import Link from "next/link";
import {ArrowLeftIcon} from "@heroicons/react/solid";
import WatchList from "../../../components/WatchList";

export default function MovieForum() {
    const router = useRouter()

    const user = useSelector((state) => state.auth.user);
    const userId = useSelector((state) => state.movies?.movies?.userId)

    const {movieId, prediction} = router.query
    const [comments, setComments] = useState(null)
    const [addedComment, setAddedComment] = useState(false)
    const textAreaRef = useRef(null)

    let movieDict = undefined

    if (prediction === "content") {
        movieDict = useSelector((state) => {
            return state.movies?.content_movies?.recommended_movies && state.movies.content_movies.recommended_movies.filter(movie => movie.movieId === movieId)
        })
    } else {
        movieDict = useSelector((state) => {
            return state.movies?.movies?.recommended_movies && state.movies.movies.recommended_movies.filter(movie => movie.movieId === movieId)
        })
    }

    const currentMovie = movieDict !== undefined ? movieDict[0] : null

    useEffect(() => {
        (async () => {
            const data = await useFetch(backendUrl + "ai/get-comments/" + movieId, "get", null, null)

            if (data !== null) {
                setComments(data.comments)
            }
        })();
    }, [movieId, addedComment])

    const sendComment = async (e) => {
        e.preventDefault();
        if(textAreaRef.current.value !== "") {
            const now = new Date();
            const commentData = {
                userId: userId,
                comment: textAreaRef.current.value,
                timestamp: now.toISOString()
            }

            const data = await useFetch(backendUrl + "ai/add-comment/" + movieId, "post", null, commentData)
            setAddedComment(prevState => !prevState)
            textAreaRef.current.value = ""
        }
    }

    return (
        <>
            <Head>
                <title>Forum - Movie Predictor</title>
                <meta
                    name="description"
                    content="Movies you would like to watch!"
                />
                <link rel="icon" href="/mp_logo.png"/>
            </Head>
            <Header/>
            {currentMovie ? (
                <div className={"container mx-auto flex flex-col"}>
                    <WatchList />
                    <button className={"sticky top-14 z-[70] flex flex-row justify-center mt-3 border-0 p-2 rounded-xl bg-black text-white font-semibold hover:border-2 hover:bg-white hover:border-gray-600 hover:text-black transition-all duration-400 ease-out"} onClick={() => router.push("/")}><ArrowLeftIcon className={"h-7"}/><p className={"ml-3"}>Go back</p></button>
                    <Banner movie={currentMovie}/>
                    <div className={"mt-5 border rounded-lg border-black mb-5"}>
                        <h2 className={"pl-2 text-lg font-bold"}>Reviews and Comments</h2>
                        <div className={"pl-2 mt-5"}>
                            {comments && comments.map((comment, index) => (
                                <div key={index} className={"flex items-center space-x-2 mb-3"}>
                                    <p className={"text-sm flex-1 whitespace-pre-wrap"}>
                                        <span className={"font-bold"}>{comment.username}</span>
                                        {" "}
                                        {comment.comment}
                                    </p>
                                    <p className={"pr-5 text-sm"}>
                                        {new Date(Date.parse(comment.timestamp)).toString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <form className="flex items-center p-4">
                            <EmojiHappyIcon className="h-7"/>
                            <textarea className="border border-blue-400 m-1 flex-1 focus:ring-0 outline-none pl-2"
                                   placeholder="Add a reviews and comments..."
                                   ref={textAreaRef}/>
                            <button type={"submit"}
                                    className="font-semibold text-blue-400 cursor-pointer disabled:cursor-not-allowed"
                                    onClick={sendComment}>Post
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className={"text-center"}>
                    <h1 className={"font-bold text-2xl m-60"}>Please Login to Continue</h1>
                </div>
            )}
        </>
    )
}