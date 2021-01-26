import React from "react";
import "./DevTool.css";
import { movies, altMovies } from "../mocks/data";
import { setupDb } from "../mocks/db";
import { useMoviesContext } from "../context/movies";

export function DevTool() {
  const { fetchMovies } = useMoviesContext();

  function resetDb() {
    setupDb(movies);
    fetchMovies();
  }

  function useAltMovies() {
    setupDb(altMovies);
    fetchMovies();
  }

  return (
    <div className="dev-tool">
      <button onClick={resetDb}>reset app</button>
      <button onClick={useAltMovies}>use alt movies</button>
    </div>
  );
}
