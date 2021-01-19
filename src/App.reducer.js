export const initialState = {
  status: "loading",
  errors: null,
  movies: null,
  selectedMovie: null,
};

export function reducer(state, action = {}) {
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
    case "POST_MOVIE_FAILED": {
      return {
        ...state,
        errors: {
          [action.movieId]: { error: action.error },
        },
      };
    }
    case "CLEAR_ERROR": {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.movieId]: null,
        },
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
