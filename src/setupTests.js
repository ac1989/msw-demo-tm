import "@testing-library/jest-dom";
import { server } from "./mocks/server.js";

/**
 * !DEMO
 */
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
