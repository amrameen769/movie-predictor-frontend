import {tmdbImageUrl} from "../constants";
import MovieDetails from "./MovieDetails";
import {useSelector} from "react-redux";

function Row({movies}) {
    const watchlist = useSelector(state => state.watchlist.watchlist)
    const movieIds = watchlist.map(movie => { return movie.movieId})

    return (
        <>
            {movies && <div className="bg-white">
                <h2 className={"font-bold text-2xl pt-3"}>Movies for you...</h2>
                <div className="flex overflow-y-hidden overflow-x-scroll h-max">
                    {movies && movies.map((movie, index) => (
                        <div key={index} className={"flex flex-col align-middle"}>
                            {movie.movieDetails.poster_path === null || movie.movieDetails.success === false? (
                                <h2 className={"text-2xl w-2 banner-row"}>{movie.title}</h2>
                            ) : (<img alt={""} className={"banner-row"}
                                      src={`${tmdbImageUrl + movie.movieDetails.poster_path}`}/>)}
                            <MovieDetails movie={movie} inWatchList={movieIds.includes(movie.movieId)}/>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
}

export default Row;