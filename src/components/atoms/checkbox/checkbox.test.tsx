import {
  render
} from "@testing-library/react";
import { Checkbox } from "./checkbox"; 

describe("Checkbox component", () => {
  it("should render the checkbox component", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.getElementsByTagName("pichincha-checkbox");
    expect(checkbox.length).toBe(1);
  });
});