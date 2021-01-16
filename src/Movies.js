import React from "react";
import { useQuery } from "react-query";
import { fetchMovies } from "./api/fetchMovies";
import "./Movies.css";
import { Movie } from "./Movie";

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
  const { status, data } = useQuery("movies", fetchMovies);
  const [selectedMovieIndex, setSelectedMovieIndex] = React.useState(-1);

  return (
    <div className="movies-page">
      {status === "success" && selectedMovieIndex >= 0 && (
        <>
          <nav
            style={{ width: "100%", maxWidth: "960px", marginBottom: "24px" }}
          >
            <button onClick={() => setSelectedMovieIndex(-1)}>
              {"< Back"}
            </button>
          </nav>

          <Movie movie={data[selectedMovieIndex]} />
        </>
      )}

      {status === "loading" && <p>loading...</p>}

      {status === "success" && selectedMovieIndex === -1 && (
        <section className="movies-selector">
          {data.map((movie, i) => (
            <span className="hover-effect">
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={() => setSelectedMovieIndex(i)}
              />
            </span>
          ))}
        </section>
      )}
    </div>
  );
}
