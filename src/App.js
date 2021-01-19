import React from "react";
import api from "./api";
import { reducer, initialState } from "./App.reducer";
import { Movies } from "./Movies";

const MoviesContext = React.createContext({});
export const useMoviesContext = () => React.useContext(MoviesContext);

function MoviesProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  async function fetchMovies() {
    dispatch({ type: "FETCH_MOVIES" });
    const movies = await api.fetchMovies();
    dispatch({ type: "FETCH_MOVIES_SUCCESS", movies });
  }

  async function updateMovie(movie) {
    const res = await api.postMovie(movie);

    if (res.status === "ok") {
      dispatch({ type: "UPDATE_MOVIE", movie });
    }

    if (res.status !== "ok") {
      console.log("fail");
      dispatch({
        type: "POST_MOVIE_FAILED",
        movieId: movie.id,
        error: res.message,
      });
    }
  }

  function selectMovie(movie) {
    dispatch({ type: "SELECT_MOVIE", movie });
  }

  function clearError(movieId) {
    dispatch({ type: "CLEAR_ERROR", movieId });
  }

  return (
    <MoviesContext.Provider
      value={{ state, fetchMovies, selectMovie, updateMovie, clearError }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function App() {
  return (
    <MoviesProvider>
      <Movies />
    </MoviesProvider>
  );
}

export default App;
