import { rest } from "msw";
import { getAll, getItemById, updateItem } from "./db";

export const handlers = [
  rest.get("/movies", (_, res, ctx) => {
    const movies = getAll();
    return res(ctx.status(200), ctx.json(movies));
  }),

  rest.get("/movie", (req, res, ctx) => {
    const movie = getItemById(req.params.id);
    return res(ctx.status(200), ctx.json(movie));
  }),

  rest.post("/movie", (req, res, ctx) => {
    if (req.body.tagLine.toLowerCase().includes("frick")) {
      return res(ctx.status(400), ctx.json({ message: "Mind your language." }));
    }

    const movies = updateItem(req.body);
    return res(ctx.status(200), ctx.json(movies));
  }),
];
