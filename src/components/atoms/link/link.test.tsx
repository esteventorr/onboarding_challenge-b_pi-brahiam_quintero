import { render, screen } from "@testing-library/react";
import { Link } from "./link";

describe("Link", () => {
  it("should render with text content and href attribute", () => {
    const href = "https://example.com";
    const textContent = "Click me";

    render(<Link href={href}>{textContent}</Link>);
    const link = screen.getByText(textContent);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
  });

  it("should render as disabled when disabled prop is passed", () => {
    const href = "https://example.com";
    const textContent = "Click me";
    const isDisabled = true;

    render(
      <Link href={href} disabled={isDisabled}>
        {textContent}
      </Link>
    );

    const link = screen.getByText(textContent);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("disabled");
  });
});
