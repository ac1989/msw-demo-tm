export async function fetchMovies() {
  const response = await fetch("/movies");
  const body = await response.json();

  return { status: response.status, body };
}
