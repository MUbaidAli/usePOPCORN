import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ToggleSection from "./components/ToggleSection";
import SearchedMovieSection from "./components/SearchedMovieSection";
import Summary from "./components/Summary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedMovieSection from "./components/WatchedMovieSection";
import StarRating from "./components/StarRating";
import toast from "react-hot-toast";
import axios from "axios";
import SelectedWatchedMovie from "./components/SelectedWatchedMovie";
import { useMovies } from "./utils/useMovies";
import { useLocalStorage } from "./utils/useLocalStorage";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    title: "Inception",
    year: "2010",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbrating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    title: "Back to the Future",
    year: "1985",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbrating: 8.5,
    userRating: 9,
  },
];

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movieRating, setMovieRating] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleClose);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectedId(id) {
    setSelectedMovieId(selectedMovieId === id ? null : id);
  }

  function handleClose() {
    setSelectedMovieId(null);
  }

  function addWatchedData(watchedData) {
    setWatched((prev) => [...prev, watchedData]);
  }

  function handleWatchedDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />

      <main className="main">
        <ToggleSection>
          <SearchedMovieSection
            handleSelectedId={handleSelectedId}
            isLoading={isLoading}
            movies={movies}
            error={error}
          />
        </ToggleSection>
        <ToggleSection>
          <WatchedMovieSection>
            {selectedMovieId ? (
              <SelectedWatchedMovie
                handleClose={handleClose}
                selectedMovieId={selectedMovieId}
                addWatchedData={addWatchedData}
                watched={watched}
              />
            ) : (
              <>
                {" "}
                <Summary watched={watched} />
                <WatchedMoviesList
                  onDelete={handleWatchedDelete}
                  handleSelectedId={handleSelectedId}
                  movies={watched}
                />
              </>
            )}
          </WatchedMovieSection>
        </ToggleSection>
      </main>
    </>
  );
}
