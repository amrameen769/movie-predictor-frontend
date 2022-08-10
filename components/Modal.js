/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon, StarIcon } from '@heroicons/react/outline'
import {StarIcon as StarIconFilled} from "@heroicons/react/solid"
import {backendUrl, tmdbImageUrl} from "../constants";
import Rating from "react-rating";
import {useDispatch, useSelector} from "react-redux";
import useFetch from "../hooks/useFetch";
import {setMoviesData, setRatingData} from "../store/slices/movieSlice";

export default function Modal({show, movie}) {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(null)
    const [loading, setLoading] = useState(false)
    const userId = useSelector(state => state.movies.movies.userId)
    const movie_rating = useSelector(state => state.movies.movies.ratings?.filter((rating) => rating && rating["movieId"] === movie["movieId"]))
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const cancelButtonRef = useRef(null)

    const updateRating = async () => {
        setLoading(true)

        const axios = require("axios").default
        setLoading(true)
        await axios({
            url: backendUrl+"ai/add-rating",
            method: "post",
            data: {
                "userId": userId.toString(),
                "movieId": movie.movieId,
                "rating": rating.toString(),
                "timestamp": new Date()
            }
        }).then(async function (response) {
            setRating(response.data["rating"])
            dispatch(setRatingData({
                rating: response.data,
                movieId: movie.movieId
            }))
            setLoading(false)
            setRating(null)
        })
    }

    return (
        <>
            <div className={"rounded-lg text-center border-2 border-black m-1"}>
                <button className={
                    "text-black font-semibold"
                } onClick={() => setOpen(true)}>Show More...</button>
            </div>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <BellIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                {movie && movie.title}
                                            </Dialog.Title>
                                            <div className="mt-2 overflow-hidden">
                                                <img src={`${tmdbImageUrl + movie.movieDetails.poster_path}`} className={"h-52"}/>
                                                <Rating className={"mt-2"} emptySymbol={<StarIcon className={"h-7"} />} fullSymbol={<StarIconFilled className={"h-7 text-amber-300"} />} initialRating={rating || (movie_rating[0] && movie_rating[0]["rating"])} onChange={(value) => setRating(value)} />
                                                <p className="text-sm text-gray-500">
                                                    {movie.movieDetails.overview}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => updateRating()}
                                    >
                                        {loading ? "Updating..." : "Rate Movie"}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}
