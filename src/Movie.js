import React from 'react'
import './Movie.css'
import { MovieCard } from './Movies'
import { postMovie } from './api/postMovie'

// {
//   "title": "The OK Gatsby",
//   "releaseDate": "2013-04-30T23:00:00.000Z",
//   "director": "Bash Luhrmann",
//   "tagLine": "A backend developer and f# evangelist, Nick, finds himself drawn to the past and lifestyle of a frontend framework, Gatsby."
// }

function TextAreaInput({ value, onChange }) {
  return (
    <textarea className="edit-description" onChange={onChange} value={value} />
  )
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function Movie({ movie, onMovieUpdate }) {
  const { releaseDate, title, tagLine } = movie

  const [status, setStatus] = React.useState('VIEWING')
  const [editText, setEditText] = React.useState(tagLine)

  async function saveMovie() {
    setStatus('SAVING')

    await Promise.all([
      await delay(1400),
      await postMovie({ ...movie, tagLine: editText }),
    ])
    onMovieUpdate({ ...movie, tagLine: editText })
    setStatus('VIEWING')
  }

  if (status === 'LOADING') {
    return <h3>LOADING...</h3>
  }

  return (
    <div className="movie-details">
      <MovieCard movie={movie} />
      <div className="movie-description">
        <h2>{title}</h2>
        <span>Released: {new Date(releaseDate).toLocaleDateString()}</span>

        {status === 'VIEWING' && (
          <>
            <p>{tagLine}</p>
            <ul className="movie-options">
              <li>
                <button
                  onClick={() => {
                    setEditText(tagLine)
                    setStatus('EDITING')
                  }}
                >
                  Edit Description
                </button>
              </li>
              <li>
                <button>Remove Movie</button>
              </li>
            </ul>
          </>
        )}

        {status === 'EDITING' && (
          <>
            <TextAreaInput
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <ul className="movie-options">
              <li>
                <button onClick={() => setStatus('VIEWING')}>Cancel</button>
              </li>
              <li>
                <button
                  onClick={() => saveMovie({ ...movie, tagLine: editText })}
                >
                  Save
                </button>
              </li>
            </ul>
          </>
        )}

        {status === 'SAVING' && <h3>SAVING..................</h3>}
      </div>
    </div>
  )
}
