import { movies } from "./data";

export function setupDb(data = movies) {
  localStorage.setItem("movies", JSON.stringify([...data]));
}

export function getAll() {
  return JSON.parse(localStorage.getItem("movies"));
}

export function updateItem(movie) {
  const movies = JSON.parse(localStorage.getItem("movies"));
  const changedMovieIndex = movies.findIndex(
    (_movie) => _movie.id === movie.id
  );
  movies[changedMovieIndex] = movie;
  localStorage.setItem("movies", JSON.stringify(movies));
  return movies;
}
