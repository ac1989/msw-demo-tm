import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("loads movies", async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByText(/once upon/i)).toBeVisible());
  expect(screen.getByText(/12 angry/i)).toBeVisible();
  expect(screen.getByText(/The Alright/i)).toBeVisible();
});

test("can click through to movie", async () => {
  render(<App />);

  await waitFor(() => screen.getByText(/once upon/i));
  fireEvent.click(screen.getByText(/once upon/i));
  expect(screen.getByText(/A mysterious stranger/i)).toBeVisible();
});

test("can edit a movie description", async () => {
  render(<App />);

  await waitFor(() => screen.getByText(/once upon/i));
  fireEvent.click(screen.getByText(/once upon/i));

  fireEvent.click(screen.getByText(/edit description/i));
  expect(screen.getByText(/cancel/i)).toBeVisible();
  expect(screen.getByText(/save/i)).toBeVisible();

  userEvent.clear(screen.getByRole("textbox"));
  userEvent.type(
    screen.getByRole("textbox"),
    "Description removed for cleaning."
  );

  fireEvent.click(screen.getByText(/save/i));
  await waitFor(() =>
    expect(screen.getByText("Description removed for cleaning.")).toBeVisible()
  );
});

test("shows error message if saving fails", async () => {
  render(<App />);

  await waitFor(() => screen.getByText(/once upon/i));
  fireEvent.click(screen.getByText(/once upon/i));

  fireEvent.click(screen.getByText(/edit description/i));
  expect(screen.getByText(/cancel/i)).toBeVisible();
  expect(screen.getByText(/save/i)).toBeVisible();

  userEvent.clear(screen.getByRole("textbox"));
  userEvent.type(screen.getByRole("textbox"), "frick the police.");

  fireEvent.click(screen.getByText(/save/i));
});
