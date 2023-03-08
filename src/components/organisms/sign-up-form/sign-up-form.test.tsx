import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SignUpForm } from "./sign-up-form";

describe("SignUpForm component", () => {
  it("renders the form with all the required fields", () => {
    render(<SignUpForm />);

    // Ensure all form fields are rendered
    expect(
      document.querySelector('[id-element="username"]')
    ).toBeInTheDocument();
    expect(document.querySelector('[id-element="email"]')).toBeInTheDocument();
    expect(
      document.querySelector('[id-element="password"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[id-element="confirm-password"]')
    ).toBeInTheDocument();
    expect(document.querySelector('[id-element="anime"]')).toBeInTheDocument();
    expect(
      document.querySelector('[id-element="cienfin"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[id-element="novelas"]')
    ).toBeInTheDocument();
    expect(document.querySelector('[id-element="drama"]')).toBeInTheDocument();
    expect(document.querySelector('[id-element="intart"]')).toBeInTheDocument();
    expect(document.querySelector('[href="/signin"]')).toBeInTheDocument();
    expect(document.querySelector('[id="sign-up-form__button"]')).toBeInTheDocument();
  });
});
