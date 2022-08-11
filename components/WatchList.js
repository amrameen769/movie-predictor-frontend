import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {useDispatch, useSelector} from "react-redux";
import useFetch from "../hooks/useFetch";
import {backendUrl, tmdbImageUrl} from "../constants";
import {removeMovieFromWatchlist, setWatchList} from "../store/slices/watchlistSlice";

export default function WatchList() {
    const [open, setOpen] = useState(false)

    const watchlist = useSelector(state => state.watchlist.watchlist)
    const userId = useSelector(state => state.movies.movies.userId)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const data = await useFetch(backendUrl + "ai/get-watchlist/" + userId, "get", null, null)
            dispatch(setWatchList({
                watchlist: data
            }))
        })();
    }, [])

    const handleRemove = async (id) => {
        let movieIds = [];
        if (watchlist.length > 0) {
            watchlist.forEach(watchListMovie => {
                if (watchListMovie.movieId !== id) movieIds.push(watchListMovie.movieId)
            })
        }

        const data = await useFetch(backendUrl + "ai/update-watchlist/" + userId, "post", null, movieIds)

        dispatch(removeMovieFromWatchlist({movieId: id}))
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="feature-btn cursor-pointer sticky top-14 z-50 bg-white"
            >
                Watchlist
            </button>
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[70]" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title
                                                        className="text-lg font-medium text-gray-900"> Watch
                                                        List </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {watchlist.map((movie) => (
                                                                <li key={movie.movieId} className="flex py-6">
                                                                    <div
                                                                        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={`${tmdbImageUrl + movie.movieDetails.poster_path}`}
                                                                            alt={movie.movieDetails.title}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div
                                                                                className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <p> {movie.title} </p>
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flex flex-1 items-end justify-between text-sm">

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                    onClick={() => handleRemove(movie.movieId)}
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
