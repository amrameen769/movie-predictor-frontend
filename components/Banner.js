import {tmdbImageUrl} from "../constants";


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
