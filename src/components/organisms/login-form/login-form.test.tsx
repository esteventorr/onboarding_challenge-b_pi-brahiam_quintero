import {
  render
} from "@testing-library/react";
import { LoginForm } from "./login-form";

describe("LoginForm component", () => {
  it("should render the login form", () => {
    const { container } = render(<LoginForm />);
    const loginForm = container.getElementsByClassName("login-form");
    expect(loginForm.length).toBe(1);
  });
});
