import React from "react";
import { DevTool } from "./components/DevTool";
import { MoviesProvider } from "./context/movies";
import { Movies } from "./components/Movies";

function App() {
  return (
    <MoviesProvider>
      {window.location.search.includes("debug") && <DevTool />}
      <Movies />
    </MoviesProvider>
  );
}

export default App;
