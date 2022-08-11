import {tmdbImageUrl} from "../constants";
import WatchList from "./WatchList";


function Banner({movie}) {
    return (
        <>
            {movie && (
                <div className={"flex bg-black object-contain h-max bg-cover bg-inherit text-black"}>
                    {movie && <img src={`${tmdbImageUrl + movie.movieDetails.poster_path}`} className={"h-96"}/>}
                    <div className="ml-8 pt-32 h-48">
                        <h1 className="text-5xl font-extrabold pb-1">
                            {movie && movie.title}
                        </h1>
                        <div className={"flex space-x-2 mt-2 mb-2"}>
                            <button
                                type="button"
                                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            >
                                Play
                            </button>
                            <WatchList />
                        </div>
                        <h1 className="w-96 leading-5 font-xs max-w-xs h-20">
                            {movie && movie.movieDetails.overview}
                        </h1>
                    </div>
                </div>
            )}

        </>
    );
}

export default Banner;
