import {tmdbImageUrl} from "../constants";
import Modal from "./Modal";

function Row({movies}) {

    return (
        <>
            {movies && <div className="bg-white">
                <h2 className={"font-bold text-2xl pt-3"}>Movies for you...</h2>
                <div className="flex overflow-y-hidden overflow-x-scroll h-max">
                    {movies && movies.map((movie, index) => (
                        <div key={index} className={"flex flex-col align-middle"}>
                            {movie.movieDetails.poster_path === null ? (
                                <h2 className={"text-2xl w-2 banner-row"}>{movie.title}</h2>
                            ) : (<img alt={""} className={"banner-row"}
                                      src={`${tmdbImageUrl + movie.movieDetails.poster_path}`}/>)}
                            <Modal movie={movie}/>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
}

export default Row;