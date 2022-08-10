import {tmdbImageUrl} from "../constants";


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
                        <div>
                            <button
                                className="cursor-pointer text-white bg-gray-900 outline-none border-none font-bold rounded-sm px-8 pr-8 mr-4 pt-2 pb-2">
                                Play
                            </button>
                            <button
                                className="cursor-pointer text-white bg-gray-900 outline-none border-none font-bold rounded-sm px-8 pr-8 mr-4 pt-2 pb-2">
                                My List
                            </button>
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
