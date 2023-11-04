function WatchedMoviesList({
  movies,
  selectedMovieId,
  setSelectedMovieId,
  onDelete,
}) {
  function showCurWatched() {}

  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <li
            key={movie.imdbID}
            style={{ cursor: "pointer" }}
            onClick={() => showCurWatched(selectedMovieId)}
          >
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.year}</span>
              </p>
            </div>
            <button
              onClick={() => onDelete(movie.imdbId)}
              className="btn-delete"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default WatchedMoviesList;
