import { rest } from "msw";
import { getAll, updateItem, setupDb } from "./db";

if (!getAll()) {
  setupDb();
}

export const handlers = [
  rest.get("/movies", (_, res, ctx) => {
    const movies = getAll();
    return res(ctx.status(200), ctx.json(movies));
  }),

  rest.post("/movie", (req, res, ctx) => {
    if (req.body.tagLine.toLowerCase().includes("frick")) {
      return res(ctx.status(400), ctx.json({ message: "Mind your language." }));
    }

    const movies = updateItem(req.body);
    return res(ctx.status(200), ctx.json(movies));
  }),
];
