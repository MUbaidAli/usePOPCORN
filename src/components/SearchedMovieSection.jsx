import ErrorPrompts from "./ErrorPrompts";
import Loader from "./Loader";

function SearchedMovieSection({ movies, isLoading, error, handleSelectedId }) {
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <ErrorPrompts error={error} />}
      {!isLoading && !error && (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <li
              key={movie.imdbID}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectedId(movie.imdbID)}
            >
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchedMovieSection;
