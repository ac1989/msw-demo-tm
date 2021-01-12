import { rest } from "msw";

const movies = [
  {
    title: "12 Angry Devs",
    releaseDate: "1957-04-10T00:00:00.000Z",
    director: "Sidney Emmet",
    tagLine:
      "A jury holdout attempts to prevent a state explosion by forcing his colleagues to reconsider using boolean combinations for all state.",
  },
  {
    title: "The OK Gatsby",
    releaseDate: "2013-04-30T23:00:00.000Z",
    director: "Bash Luhrmann",
    tagLine:
      "A backend developer and f# evangelist, Nick, finds himself drawn to the past and lifestyle of a frontend framework, Gatsby.",
  },
  {
    title: "Once Upon a Time in the Repo",
    releaseDate: "1968-12-19T23:00:00.000Z",
    director: "Purgio Cacheone",
    tagLine:
      "A mysterious stranger with a terminal joins forces with a notorious tabs user to protect a meticulous codebase from a ruthless developer commiting directly to master.",
  },
];

export const handlers = [
  rest.get("/movies", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(movies));
  }),
];
