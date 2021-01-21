import { rest } from "msw";

const movies = [
  {
    id: "4f608162-bbd6-4505-8ba6-a0f44363d3fe",
    poster: "rebeccapurple",
    title: "12 Angry Devs",
    releaseDate: "1957-04-10T00:00:00.000Z",
    director: "Sidney Emmet",
    tagLine:
      "A jury holdout attempts to prevent a state explosion by forcing his colleagues to reconsider using boolean combinations for all state.",
  },
  {
    id: "9851f83d-d4a6-439c-937c-6acb2e804d5c",
    poster: "plum",
    title: "The Alright Gatsby",
    releaseDate: "2013-04-30T23:00:00.000Z",
    director: "Bash Luhrmann",
    tagLine:
      "A backend developer and f# evangelist, Nick, finds himself drawn to the past and lifestyle of a frontend framework, Gatsby.",
  },
  {
    id: "45bc2e8e-b164-4bba-bde4-ad556a15c194",
    poster: "slateblue",
    title: "Once Upon a Time in the Repo",
    releaseDate: "1968-12-19T23:00:00.000Z",
    director: "Purgio Cacheone",
    tagLine:
      "A mysterious stranger with a terminal joins forces with a notorious tabs user to protect a meticulous codebase from a ruthless developer committing directly to master.",
  },
];

localStorage.setItem("movies", JSON.stringify(movies));

export const handlers = [
  rest.get("/movies", (_, res, ctx) => {
    const mvs = localStorage.getItem("movies");
    return res(ctx.status(200), ctx.json(JSON.parse(mvs)));
  }),

  rest.get("/movie", (req, res, ctx) => {
    const mvs = JSON.parselocalStorage.getItem("movies");
    return res(
      ctx.status(200),
      ctx.json(mvs.find((movie) => movie.id === req.params.id))
    );
  }),

  rest.post("/movie", (req, res, ctx) => {
    if (req.body.tagLine.toLowerCase().includes("frick")) {
      return res(ctx.status(400), ctx.json({ message: "Mind your language." }));
    }

    const mvs = JSON.parse(localStorage.getItem("movies"));

    const changedMovieIndex = mvs.findIndex(
      (movie) => movie.id === req.body.id
    );
    mvs[changedMovieIndex] = req.body;
    localStorage.setItem("movies", JSON.stringify(mvs));

    return res(ctx.status(200), ctx.json({ status: "ok" }));
  }),
];
