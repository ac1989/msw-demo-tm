import React from "react";
import "./Movie.css";
import { MovieCard } from "./Movies";

// {
//   "title": "The OK Gatsby",
//   "releaseDate": "2013-04-30T23:00:00.000Z",
//   "director": "Bash Luhrmann",
//   "tagLine": "A backend developer and f# evangelist, Nick, finds himself drawn to the past and lifestyle of a frontend framework, Gatsby."
// }

export function Movie({ movie }) {
  const { title, tagLine } = movie;
  return (
    <div className="movie-details">
      <MovieCard movie={movie} />
      <div className="movie-description">
        <h2>{title}</h2>
        <p>{tagLine}</p>
      </div>
    </div>
  );
}
