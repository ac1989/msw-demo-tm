import React from 'react'
import { fetchMovies } from './api/fetchMovies'
import './Movies.css'
import { Movie } from './Movie'

export function MovieCard({ movie, handleClick }) {
  const { title, poster } = movie
  return (
    <div
      className="movie-card-poster"
      onClick={handleClick}
      style={{ backgroundColor: poster }}
    >
      <span>{title}</span>
    </div>
  )
}

export function Movies() {
  const [selectedMovieIndex, setSelectedMovieIndex] = React.useState(-1)
  const [{ status, movies }, setState] = React.useState({
    status: 'loading',
    movies: null,
  })

  React.useEffect(() => {
    fetchMovies().then((movies) => setState({ status: 'success', movies }))
  }, [])

  function handleMovieUpdate(movie) {
    const movieIndex = movies.findIndex((item) => item.id === movie.id)
    setState({
      status,
      movies: [
        ...movies.slice(0, movieIndex),
        movie,
        ...movies.slice(movieIndex + 1),
      ],
    })
  }

  return (
    <div className="movies-page">
      {status === 'loading' && <p>loading...</p>}

      {status === 'success' && selectedMovieIndex === -1 && (
        <section className="movies-selector">
          {movies.map((movie, i) => (
            <span className="hover-effect">
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={() => setSelectedMovieIndex(i)}
              />
            </span>
          ))}
        </section>
      )}

      {status === 'success' && selectedMovieIndex >= 0 && (
        <>
          <nav
            style={{ width: '100%', maxWidth: '960px', marginBottom: '24px' }}
          >
            <button onClick={() => setSelectedMovieIndex(-1)}>
              {'< Back'}
            </button>
          </nav>

          <Movie
            movie={movies[selectedMovieIndex]}
            onMovieUpdate={handleMovieUpdate}
          />
        </>
      )}
    </div>
  )
}
