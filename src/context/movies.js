import React from "react";
import api from "../api";
import { reducer, initialState } from "./movies.reducer";

const MoviesContext = React.createContext({});

export const useMoviesContext = () => {
  const [state, dispatch] = React.useContext(MoviesContext);

  const fetchMovies = React.useCallback(async () => {
    dispatch({ type: "FETCH_MOVIES" });

    const { status, body: movies } = await api.fetchMovies();

    if (status === 200) {
      dispatch({ type: "FETCH_MOVIES_SUCCESS", movies });
    }

    if (status !== 200) {
      // system shock
    }
  }, [dispatch]);

  async function updateMovie(movie) {
    dispatch({ type: "POST_MOVIE" });

    const { status, body } = await api.postMovie(movie);

    if (status === 200) {
      dispatch({ type: "POST_MOVIE_SUCCESS", movie });
    }

    if (status !== 200) {
      dispatch({
        type: "POST_MOVIE_FAILED",
        movieId: movie.id,
        error: body.message,
      });
    }
  }

  function selectMovie(movie) {
    dispatch({ type: "SELECT_MOVIE", movie });
  }

  function deselectMovie() {
    dispatch({ type: "DESELECT_MOVIE" });
  }

  function toggleMovieEditing() {
    dispatch({ type: "TOGGLE_MOVIE_EDITING" });
  }

  function acceptApology() {
    dispatch({ type: "ACCEPT_APOLOGY" });
  }

  return {
    state,
    fetchMovies,
    selectMovie,
    deselectMovie,
    updateMovie,
    toggleMovieEditing,
    acceptApology,
  };
};

export function MoviesProvider({ children }) {
  const value = React.useReducer(reducer, initialState);

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
