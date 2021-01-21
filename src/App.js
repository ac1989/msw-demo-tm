import React from "react";
import { MoviesProvider } from "./context/movies";
import { Movies } from "./components/Movies";

function App() {
  return (
    <MoviesProvider>
      <Movies />
    </MoviesProvider>
  );
}

export default App;
