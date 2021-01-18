export async function postMovie(movie) {
  const response = await fetch("/movie", {
    method: "post",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}
