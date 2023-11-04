import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import StarRating from "./StarRating";

function SelectedWatchedMovie({
  handleClose,
  selectedMovieId,
  watched,
  addWatchedData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovieData, setSelectedMovieData] = useState([]);
  const [useRating, setUserRating] = useState(null);
  const APIENDPOINT = "http://www.omdbapi.com/?apikey=20b20851";

  const isRating = watched
    .map((movie) => movie.imdbId)
    .includes(selectedMovieId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedMovieId
  )?.useRating;

  const {
    Poster: poster,
    Title: title,
    Genre: genre,
    Released: released,
    Runtime: runtime,
    imdbRating: imdbrating,
    Plot: plot,
    Actors: actors,
    Director: director,
    Year: year,
  } = selectedMovieData;

  useEffect(() => {
    async function getSelectedMovie() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${APIENDPOINT}&i=${selectedMovieId}`);
        setSelectedMovieData(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getSelectedMovie();
  }, [selectedMovieId]);

  useEffect(() => {
    function handleEscKey(e) {
      if (e.code === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [handleClose]);

  function handleAdd() {
    const newWatchedData = {
      title,
      imdbId: selectedMovieId,
      year,
      poster,
      imdbRating: Number(imdbrating),
      runtime: Number(runtime.split(" ").at(0)),
      useRating,
    };

    addWatchedData(newWatchedData);
    handleClose();
  }

  useEffect(() => {
    if (!title) return;
    document.title = `Movie: ${title} `;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      <button
        className="btn-back"
        onClick={() => handleClose(null)}
        // style={{ width: "30px", height: "30px", borderRadius: "50px" }}
      >
        &larr;
      </button>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back">&larr;</button>
            <img src={poster} alt={`Poster of  ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbrating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isRating ? (
                <>
                  <StarRating
                    ratingLength={10}
                    size="20"
                    onSet={setUserRating}
                  />
                  {useRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You Have Rated This Movie With {watchedUserRating} ⭐️ </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedWatchedMovie;
