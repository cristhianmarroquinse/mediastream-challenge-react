/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "../assets/styles.css";
import { useEffect, useState } from "react";
import MovieDetailsCard from "./MovieDetailsCard";
import MovieFilter from "./MovieFilter";
import { useFetch } from "../../../../hooks/useFetch";

const MovieLibrary = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState();
  const [yearSorting, setYearSorting] = useState("Descending");

  const { data: moviesData, loading: loadingMovies } = useFetch(
    "http://localhost:3001/movies"
  );
  const { data: genresData, loading: loadingGenres } = useFetch(
    "http://localhost:3001/genres"
  );

  useEffect(() => {
    setLoading(loadingMovies || loadingGenres);
  }, [loadingMovies, loadingGenres]);

  useEffect(() => {
    if (!moviesData) return;
    const sortedMovies = Array.isArray(moviesData)
      ? sortMovies(moviesData)
      : [];
    setMovies(sortedMovies);
    setCurrentMovies(sortedMovies);
  }, [moviesData]);

  useEffect(() => {
    if (!genresData) return;
    setGenres(genresData);
  }, [genresData]);

  useEffect(() => {
    setCurrentMovies(
      movies.filter((movie) => movie.genres.includes(selectedGenre))
    );
  }, [selectedGenre]);

  useEffect(() => {
    setCurrentMovies(sortMovies(currentMovies));
  }, [yearSorting]);

  const sortMovies = (movies) =>
    [...movies].sort((a, b) =>
      yearSorting === "Ascending" ? +b.year - +a.year : +a.year - +b.year
    );

  const handleOrderChange = () =>
    setYearSorting(yearSorting === "Ascending" ? "Descending" : "Ascending");

  if (loading)
    return (
      <section className="movie-library-container">
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      </section>
    );

  return (
    <section className="movie-library-container">
      <h1 className="movie-library__title">Movie Library</h1>
      <MovieFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        handleOrderChange={handleOrderChange}
        yearSorting={yearSorting}
      />
      <ul className="movie-library__list">
        {currentMovies.map((movie) => (
          <MovieDetailsCard movie={movie} key={movie.id}/>
        ))}
      </ul>
    </section>
  );
};

export default MovieLibrary;
