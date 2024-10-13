import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("adds a new todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: "Test todo" } });
  fireEvent.click(screen.getByText(/add/i));

  expect(screen.getByText(/test todo/i)).toBeInTheDocument();
  expect(screen.getByText(/1 items left/i)).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: "Test todo" } });
  fireEvent.click(screen.getByText(/add/i));
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getByText(/0 items left/i)).toBeInTheDocument();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(screen.getByText(/1 items left/i)).toBeInTheDocument();
});

test("deletes a todo", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(input, { target: { value: "Test todo" } });
  fireEvent.click(screen.getByText(/add/i));

  expect(screen.getByText(/test todo/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/delete/i));
  expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
  expect(screen.getByText(/0 items left/i)).toBeInTheDocument();
});

test("clears all completed todos", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/what needs to be done/i);

  fireEvent.change(input, { target: { value: "Task 1" } });
  fireEvent.click(screen.getByText(/add/i));
  fireEvent.change(input, { target: { value: "Task 2" } });
  fireEvent.click(screen.getByText(/add/i));
  fireEvent.change(input, { target: { value: "Task 3" } });
  fireEvent.click(screen.getByText(/add/i));

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[0]);
  fireEvent.click(checkboxes[1]);

  expect(screen.getByText(/1 items left/i)).toBeInTheDocument();

  const clearButton = screen.getByText(/clear completed/i);
  expect(clearButton).not.toBeDisabled();

  fireEvent.click(clearButton);

  expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/task 2/i)).not.toBeInTheDocument();
  expect(screen.getByText(/task 3/i)).toBeInTheDocument();
  expect(screen.getByText(/1 items left/i)).toBeInTheDocument();
  expect(clearButton).toBeDisabled();
});
