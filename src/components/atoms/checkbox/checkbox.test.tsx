import {
  render
} from "@testing-library/react";
import { Checkbox } from "./checkbox"; 

describe("Checkbox component", () => {
  it("should render the checkbox component", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.getElementsByTagName("pichincha-check-box");
    expect(checkbox.length).toBe(1);
  });
});