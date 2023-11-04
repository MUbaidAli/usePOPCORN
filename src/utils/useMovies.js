import axios from "axios";
import { useEffect, useState } from "react";

const APIENDPOINT = "http://www.omdbapi.com/?apikey=20b20851";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchdata() {
      try {
        setError("");
        setIsLoading(true);
        const res = await axios.get(`${APIENDPOINT}&s=${query}`, {
          signal: controller.signal,
        });
        if (res.data.Error) {
          throw new Error(res.data.Error);
        }
        if (res.data.Search) {
          setMovies((mov) => [...res.data.Search]);
          // console.log(res);
          setError("");
        }
      } catch (error) {
        // if (error.message === "AbortError") return;
        if (error.name !== "AbortError") {
          console.log(error.message);
          setError(error.message);
        }
      } finally {
        // setError("");
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    callback?.();
    fetchdata();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
