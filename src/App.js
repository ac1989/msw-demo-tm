import React from "react";
import { Movies } from "./Movies";
import api from "./api";

const MoviesContext = React.createContext({});
export const useMoviesContext = () => React.useContext(MoviesContext);

const initialState = {
  status: "loading",
  movies: null,
  selectedMovie: null,
};

function reducer(state, action = {}) {
  switch (action.type) {
    case "FETCH_MOVIES": {
      return {
        status: "loading",
        movies: null,
        selectedMovie: null,
      };
    }
    case "FETCH_MOVIES_SUCCESS": {
      return {
        status: "success",
        movies: action.movies,
        selectedMovie: null,
      };
    }
    case "SELECT_MOVIE": {
      return {
        ...state,
        selectedMovie: action.movie,
      };
    }
    case "UPDATE_MOVIE": {
      const { movie } = action;
      const { movies } = state;
      const movieIndex = movies.findIndex((item) => item.id === movie.id);
      return {
        ...state,
        movies: [
          ...movies.slice(0, movieIndex),
          movie,
          ...movies.slice(movieIndex + 1),
        ],
        selectedMovie: movie,
      };
    }
    default:
      return state;
  }
}

function MoviesProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  async function fetchMovies() {
    dispatch({ type: "FETCH_MOVIES" });
    const movies = await api.fetchMovies();
    dispatch({ type: "FETCH_MOVIES_SUCCESS", movies });
  }

  function selectMovie(movie) {
    dispatch({ type: "SELECT_MOVIE", movie });
  }

  async function updateMovie(movie) {
    await api.postMovie(movie);
    dispatch({ type: "UPDATE_MOVIE", movie });
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
