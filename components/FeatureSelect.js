import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import useFetch from "../hooks/useFetch";
import {backendUrl} from "../constants";
import {useDispatch, useSelector} from "react-redux";
// import {setMoviesData} from "../store/slices/movieSlice";
import {setContentBasedData} from "../store/slices/movieSlice";

function FeatureButton({value, action, selected}) {
    const [select, setSelect] = useState(selected)
    const selectFeature = (e) => {
        action(value)
        setSelect(!select)
    }
    return (
        <button onClick={selectFeature} className={`feature-btn ${select ? "bg-white" : ""}`}>{value}</button>
    )
}

export default function FeatureSelect({ratingCounts, preferences}) {
    const features = preferences["preferences"]
    let [isOpen, setIsOpen] = useState(false)
    let [featureStack, setFeatureStack] = useState(features)
    const user_id = useSelector(state => state.movies.movies.userId)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [loading, setLoading] = useState(false)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const addValueToFeatureStack = (value) => {
        if (!featureStack.includes(value)) setFeatureStack(prevState => [...prevState, value])
        else setFeatureStack(prevState => {
            return prevState.filter(obj => obj !== value)
        })
    }

    const updatePreferences = async () => {
        const diff1 = features.filter(genre => !featureStack.includes(genre))
        const diff2 = featureStack.filter(genre => !features.includes(genre))
        if (diff1.length > 0 || diff2.length > 0) {
            setLoading(true)
            const data = await useFetch(backendUrl + "ai/add-user-preferences/" + user_id, "post", null, featureStack)
            setFeatureStack(await data["preferences"])

            // const userdata = await useFetch(backendUrl + "ai/recommend/user" , "get", user.access_token)
            // dispatch((setMoviesData({
            //     movies: userdata
            // })))
            const contentBasedData = await useFetch(backendUrl+"ai/content-recommend?genres="+featureStack.join(" ").toLowerCase() + "&user_id=" + user_id, "get", null, null)
            dispatch(setContentBasedData({
                movies: contentBasedData
            }))
            setLoading(false)
            closeModal()
        } else {
            closeModal()
        }
    }
    const genres = [
        'Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy', 'Romance', 'Drama', 'Action', 'Crime', 'Thriller', 'Horror', 'Mystery', 'Sci-Fi', 'War', 'Musical', 'Documentary', 'IMAX', 'Western', 'Film-Noir'
    ]

    return (
        <>

            <div onClick={openModal} className={"feature-btn cursor-pointer sticky top-14 z-50 bg-white"}>My Preferences</div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[70]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Select your preferences
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div>
                                            <p className={"font-bold"}>Genres</p>
                                            <div
                                                className={"grid grid-cols-3 gap-2 rounded-xl bg-blue-900/20 p-1 justify-between"}>
                                                {genres && genres.map((genre, index) => (
                                                    <FeatureButton value={genre} selected={featureStack.includes(genre)}
                                                                   key={index} action={addValueToFeatureStack}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={updatePreferences}
                                        >
                                            {loading ? "Updating..." : "OK"}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}