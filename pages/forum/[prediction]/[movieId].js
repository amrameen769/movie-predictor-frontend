import {useSelector} from "react-redux";
import Header from "../../../components/Header";
import {useRouter} from "next/router";
import Banner from "../../../components/Banner";
import Head from "next/head";
import {useEffect, useState} from "react";
import {EmojiHappyIcon} from "@heroicons/react/outline";
import useFetch from "../../../hooks/useFetch";
import {backendUrl} from "../../../constants";

export default function MovieForum() {
    const user = useSelector((state) => state.auth.user);
    const userId = useSelector((state) => state.movies.movies.userId)
    const router = useRouter()
    const [postComment, setPostComment] = useState("")
    const {movieId, prediction} = router.query
    const [comments, setComments] = useState(null)
    const [addedComment, setAddedComment] = useState(false)

    let movieDict = undefined

    if (prediction === "content") {
        movieDict = useSelector((state) => {
            return state.movies.content_movies.recommended_movies && state.movies.content_movies.recommended_movies.filter(movie => movie.movieId === movieId)
        })
    } else {
        movieDict = useSelector((state) => {
            return state.movies.movies.recommended_movies && state.movies.movies.recommended_movies.filter(movie => movie.movieId === movieId)
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
        const commentData = {
            userId: userId,
            comment: postComment
        }

        const data = await useFetch(backendUrl + "ai/add-comment/" + movieId, "post", null, commentData)
        setAddedComment(prevState => !prevState)
        setPostComment("")
    }

    return (
        <>
            <Head>
                <title>Forum - Movie Predictor</title>
                <meta
                    name="description"
                    content="Movies you would like to watch!"
                />
                <link rel="icon" href="/public/mp_logo.png"/>
            </Head>
            {user && <Header/>}
            {currentMovie && (
                <div className={"container mx-auto flex flex-col"}>
                    <Banner movie={currentMovie}/>
                    <div className={"mt-5 border rounded-lg border-black mb-5"}>
                        <h2 className={"pl-2 text-lg font-bold"}>Comments</h2>
                        <div className={"pl-2 mt-5"}>
                            {comments && comments.map((comment, index) => (
                                <div key={index} className={"flex items-center space-x-2 mb-3"}>
                                    <p className={"test-sm flex-1"}>
                                        <span className={"font-bold"}>{comment.username}</span>
                                        {" "}
                                        {comment.comment}
                                    </p>
                                    <p className={"pr-5 text-sm"}>
                                        {new Date(Date.parse(comment.timestamp)).toUTCString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <form className="flex items-center p-4">
                            <EmojiHappyIcon className="h-7"/>
                            <input type="text" className="border-none flex-1 focus:ring-0 outline-none pl-2"
                                   placeholder="Add a comment..." value={postComment}
                                   onChange={e => setPostComment(e.target.value)}/>
                            <button type={"submit"} disabled={!postComment.trim()}
                                    className="font-semibold text-blue-400 cursor-pointer disabled:cursor-not-allowed"
                                    onClick={sendComment}>Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}