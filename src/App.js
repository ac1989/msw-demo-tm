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
    await api.postMovie(movie);
    dispatch({ type: "UPDATE_MOVIE", movie });
  }

  function selectMovie(movie) {
    dispatch({ type: "SELECT_MOVIE", movie });
  }

  return (
    <MoviesContext.Provider
      value={{ state, fetchMovies, selectMovie, updateMovie }}
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
