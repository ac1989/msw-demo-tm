export function setupDb(movies) {
  localStorage.setItem("movies", JSON.stringify([...movies]));
}

export function getAll() {
  return JSON.parse(localStorage.getItem("movies"));
}

export function getItemById(id) {
  return JSON.parse(
    localStorage.getItem("movies").find((movie) => movie.id === id)
  );
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
