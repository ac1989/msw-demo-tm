import React from "react";
import { useQuery } from "react-query";
import { fetchMovies } from "./api/fetchMovies";

export function Movies() {
  const { status, data } = useQuery("movies", fetchMovies);

  return (
    <div>
      {status === "loading" && <p>loading...</p>}
      {status === "success" && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
