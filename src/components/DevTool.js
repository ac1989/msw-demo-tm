import React from "react";
import "./DevTool.css";
import * as data from "../mocks/data";
import { setupDb } from "../mocks/db";
import { useMoviesContext } from "../context/movies";

export function DevTool() {
  const { fetchMovies } = useMoviesContext();

  function resetDb() {
    setupDb();
    fetchMovies();
  }

  function chooseMovieSet(e) {
    const { value } = e.target;
    setupDb(data[value]);
    fetchMovies();
  }

  return (
    <div className="dev-tool">
      <button onClick={resetDb}>reset app</button>
      <select onChange={chooseMovieSet} style={{ padding: "4px" }}>
        {Object.keys(data).map((movieSetName) => (
          <option value={movieSetName} key={movieSetName}>
            {movieSetName}
          </option>
        ))}
      </select>
    </div>
  );
}
