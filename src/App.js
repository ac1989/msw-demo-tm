import React from "react";
import api from "./api";
import { reducer, initialState } from "./App.reducer";
import { Movies } from "./Movies";

const MoviesContext = React.createContext({});

export const useMoviesContext = () => {
  const [state, dispatch] = React.useContext(MoviesContext);

  const fetchMovies = React.useCallback(async () => {
    dispatch({ type: "FETCH_MOVIES" });
    const { body: movies } = await api.fetchMovies();
    dispatch({ type: "FETCH_MOVIES_SUCCESS", movies });
  }, [dispatch]);

  async function updateMovie(movie) {
    const { status, body } = await api.postMovie(movie);

    if (status === 200) {
      dispatch({ type: "UPDATE_MOVIE", movie });
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

  function clearError(movieId) {
    dispatch({ type: "CLEAR_ERROR", movieId });
  }

  return { state, fetchMovies, selectMovie, updateMovie, clearError };
};

function MoviesProvider({ children }) {
  const value = React.useReducer(reducer, initialState);

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
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
