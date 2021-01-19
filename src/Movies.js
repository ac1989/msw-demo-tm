import React from "react";
import "./Movies.css";
import { Movie } from "./Movie";
import { useMoviesContext } from "./App";

export function MovieCard({ movie, handleClick }) {
  const { title, poster } = movie;
  return (
    <div
      className="movie-card-poster"
      onClick={handleClick}
      style={{ backgroundColor: poster }}
    >
      <span>{title}</span>
    </div>
  );
}

export function Movies() {
  const {
    state: { status, movies, selectedMovie },
    fetchMovies,
    selectMovie,
    updateMovie,
  } = useMoviesContext();

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      {status === "loading" && <p>loading...</p>}

      {status === "success" && !selectedMovie && (
        <section className="movies-selector">
          {movies.map((movie, i) => (
            <span className="hover-effect" key={movie.id}>
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={() => selectMovie(movies[i])}
              />
            </span>
          ))}
        </section>
      )}

      {status === "success" && selectedMovie && (
        <>
          <nav
            style={{ width: "100%", maxWidth: "960px", marginBottom: "24px" }}
          >
            <button onClick={() => selectMovie(null)}>{"< Back"}</button>
          </nav>

          <Movie movie={selectedMovie} onMovieUpdate={updateMovie} />
        </>
      )}
    </div>
  );
}
