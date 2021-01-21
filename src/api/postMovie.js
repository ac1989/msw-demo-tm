export async function postMovie(movie) {
  const response = await fetch("/movie", {
    method: "post",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();

  return { status: response.status, body };
}
