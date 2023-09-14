import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders footer", () =>
{
  render(<App />);
  const footerText = screen.getByText(/space travel/i);
  expect(footerText).toBeInTheDocument();
});
