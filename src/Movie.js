import React from "react";
import "./Movie.css";
import { MovieCard } from "./Movies";
import { postMovie } from "./api/postMovie";
import { useMoviesContext } from "./App";

function TextAreaInput({ value, onChange }) {
  return (
    <textarea className="edit-description" onChange={onChange} value={value} />
  );
}

function MovieOptions({ actions }) {
  return (
    <ul className="movie-options">
      {actions.map((action) => (
        <button onClick={action.onClick}>{action.text}</button>
      ))}
    </ul>
  );
}

export function Movie() {
  const { state, updateMovie } = useMoviesContext();
  const { selectedMovie: movie } = state;
  const { releaseDate, title, tagLine } = movie;

  const [status, setStatus] = React.useState("VIEWING");
  const [editText, setEditText] = React.useState(tagLine);

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
        <span>Released: {new Date(releaseDate).toLocaleDateString()}</span>

        {status === "VIEWING" && (
          <>
            <p>{tagLine}</p>
            <MovieOptions
              actions={[{ text: "EditDescription", onClick: handleEditClick }]}
            />
          </>
        )}

        {status === "EDITING" && (
          <>
            <TextAreaInput
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
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
