import React from "react";
import "./Movie.css";
import { MovieCard } from "./Movies";
import { useMoviesContext } from "./App";

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
  const { state, updateMovie, clearError } = useMoviesContext();
  const { selectedMovie: movie, errors } = state;
  const { releaseDate, title, tagLine } = movie;

  const [status, setStatus] = React.useState("VIEWING");
  const [editText, setEditText] = React.useState(tagLine);

  React.useEffect(() => {
    if (errors && errors[movie.id]) {
      setStatus("ERROR");
    }
  }, [errors]);

  async function saveMovie() {
    setStatus("SAVING");
    await updateMovie({ ...movie, tagLine: editText });
    setStatus("VIEWING");
  }

  function handleEditClick() {
    setEditText(tagLine);
    setStatus("EDITING");
  }

  if (status === "LOADING") {
    return <h3>LOADING...</h3>;
  }

  return (
    <div className="movie-details">
      <MovieCard movie={movie} />

      <div className="movie-description">
        <h2>{title}</h2>
        <span style={{ marginTop: "4px", color: "rgba(0, 0, 0, 0.6)" }}>
          Released: {new Date(releaseDate).toLocaleDateString()}
        </span>

        {status === "ERROR" && (
          <>
            <h3>
              Error: {errors[movie.id].error}
              <button
                onClick={() => {
                  setStatus("VIEWING");
                  clearError(movie.id);
                }}
              >
                ok i'm sorry
              </button>
            </h3>
          </>
        )}

        {status === "VIEWING" && (
          <>
            <p>{tagLine}</p>
            <MovieOptions
              actions={[{ text: "Edit Description", onClick: handleEditClick }]}
            />
          </>
        )}

        {status === "EDITING" && (
          <>
            <textarea
              className="edit-description"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
            />
            <MovieOptions
              actions={[
                { text: "Cancel", onClick: () => setStatus("VIEWING") },
                {
                  text: "Save",
                  onClick: () => saveMovie({ ...movie, tagLine: editText }),
                },
              ]}
            />
          </>
        )}

        {status === "SAVING" && <h3>SAVING...</h3>}
      </div>
    </div>
  );
}
