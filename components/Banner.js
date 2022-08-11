import {tmdbImageUrl} from "../constants";
import WatchList from "./WatchList";


function Banner({movie}) {
    return (
        <>
            {movie && (
                <div className={"flex bg-black object-contain bg-cover bg-inherit text-black mt-5"}>
                    {movie && <img src={`${tmdbImageUrl + movie.movieDetails.poster_path}`}
                                   className={"h-96"}/>}
                    <div className="ml-8 self-center">
                        <h1 className="text-5xl font-extrabold pb-1">
                            {movie && movie.title}
                        </h1>
                        <div className={"flex space-x-2 mt-2 mb-2"}>
                            <WatchList/>
                        </div>
                        <h1 className="w-96 leading-5 font-xs">
                            {movie && movie.movieDetails.overview}
                        </h1>
                    </div>
                </div>
            )}

        </>
    );
}

export default Banner;
