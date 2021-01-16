export async function fetchMovie(movieId) {
  const response = await fetch(`/movie?id=${movieId}`)
  const json = await response.json()
  return json
}
