import React from "react";
import "./DevTool.css";
import { movies } from "../mocks/data";
import { setupDb } from "../mocks/db";
import { useMoviesContext } from "../context/movies";

export function DevTool() {
  const { fetchMovies } = useMoviesContext();

  function resetDb() {
    setupDb(movies);
    fetchMovies();
  }

  return (
    <div className="dev-tool">
      <button onClick={resetDb}>reset app</button>
    </div>
  );
}
