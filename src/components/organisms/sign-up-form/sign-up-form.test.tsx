import { render } from "@testing-library/react";
import { SignUpForm } from "./sign-up-form";

describe("SignUpForm component", () => {
  it("should render the signup form", () => {
    const { container } = render(<SignUpForm />);
    const signupForm = container.getElementsByClassName("sign-up-form");
    expect(signupForm.length).toBe(1);
  });
});
