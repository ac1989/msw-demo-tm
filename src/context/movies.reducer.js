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
        selectedMovie: { ...action.movie, status: "viewing" },
      };
    }
    case "DESELECT_MOVIE": {
      return {
        ...state,
        selectedMovie: null,
      };
    }
    case "TOGGLE_MOVIE_EDITING": {
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          status:
            state.selectedMovie.status === "editing" ? "viewing" : "editing",
        },
      };
    }
    case "POST_MOVIE": {
      return {
        ...state,
        selectedMovie: { ...state.selectedMovie, status: "saving" },
      };
    }
    case "POST_MOVIE_SUCCESS": {
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
        selectedMovie: { ...movie, status: "viewing" },
      };
    }
    case "POST_MOVIE_FAILED": {
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          status: "error",
          error: action.error,
        },
      };
    }
    case "ACCEPT_APOLOGY": {
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          status: "viewing",
          error: null,
        },
      };
    }
    default:
      return state;
  }
}
