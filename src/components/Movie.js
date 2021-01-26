import React from "react";
import "./Movie.css";
import { MovieCard } from "./Movies";
import { useMoviesContext } from "../context/movies";

function MovieOptions({ actions }) {
  return (
    <ul className="movie-options">
      {actions.map((action) => (
        <button onClick={action.onClick} key={action.text}>
          {action.text}
        </button>
      ))}
    </ul>
  );
}

export function Movie() {
  const {
    state,
    updateMovie,
    toggleMovieEditing,
    acceptApology,
  } = useMoviesContext();
  const { selectedMovie: movie } = state;
  const { releaseDate, title, tagLine, status } = movie;
  const [editText, setEditText] = React.useState(tagLine);

  function handleEditClick() {
    toggleMovieEditing();
    setEditText(tagLine);
  }

  return (
    <div className="movie-details">
      <MovieCard movie={movie} />

      <div className="movie-description">
        <h2>{title}</h2>
        <span style={{ marginTop: "4px", color: "rgba(0, 0, 0, 0.6)" }}>
          Released: {new Date(releaseDate).toLocaleDateString()}
        </span>

        <div className="movie-description-content">
          {status === "error" && (
            <>
              <h3>Error: {movie.error}</h3>
              <MovieOptions
                actions={[{ text: "ok im sorry", onClick: acceptApology }]}
              />
            </>
          )}

          {status === "viewing" && (
            <>
              <p>{tagLine}</p>
              <MovieOptions
                actions={[
                  { text: "Edit Description", onClick: handleEditClick },
                ]}
              />
            </>
          )}

          {status === "editing" && (
            <>
              <textarea
                className="edit-description"
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
              />
              <MovieOptions
                actions={[
                  { text: "Cancel", onClick: toggleMovieEditing },
                  {
                    text: "Save",
                    onClick: () => updateMovie({ ...movie, tagLine: editText }),
                  },
                ]}
              />
            </>
          )}

          {status === "saving" && <h3>SAVING...</h3>}
        </div>
      </div>
    </div>
  );
}
