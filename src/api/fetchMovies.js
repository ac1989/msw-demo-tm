export async function fetchMovies() {
  const response = await fetch("/movies");
  const json = await response.json();
  return json;
}
