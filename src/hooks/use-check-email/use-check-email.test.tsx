import { renderHook, waitFor } from "@testing-library/react";
import { useCheckEmail } from "./use-check-email";
import { checkUserExists } from "../../services/user-exist";
import { act } from "react-dom/test-utils";

jest.mock("../../services/user-exist", () => ({
  checkUserExists: jest.fn(),
}));

describe("useCheckEmail", () => {
  const defaultProps = {
    email: "testuser@example.com",
    checkExist: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty error message when email is valid and checkExist is false", async () => {
    const { result } = renderHook(() =>
      useCheckEmail(defaultProps.email, defaultProps.checkExist)
    );

    expect(result.current.emailErrorMessage).toBe("");
  });

  it("returns error message when email is invalid and checkExist is false", () => {
    const { result } = renderHook(() =>
      useCheckEmail("", defaultProps.checkExist)
    );

    expect(result.current.emailErrorMessage).toBe(
      "Correo Electrónico es requerido"
    );
  });

  it("returns error message when email exists and checkExist is true", async () => {
    (
      checkUserExists as jest.MockedFunction<typeof checkUserExists>
    ).mockResolvedValue(true);

    let result: any;

    await act(async () => {
      result = renderHook(() =>
        useCheckEmail(defaultProps.email, true)
      ).result;
    }); 

    expect(checkUserExists).toBeCalledWith(defaultProps.email, true);
    expect(result.current.emailErrorMessage).toBe("Correo ya existe");
  });

  it("returns error message when email exists and checkExist is false", async () => {
    (
      checkUserExists as jest.MockedFunction<typeof checkUserExists>
    ).mockResolvedValue(true);

    let result: any;

    await act(async () => {
      result = renderHook(() =>
        useCheckEmail(defaultProps.email, true)
      ).result;
    });

    expect(checkUserExists).toBeCalledWith(defaultProps.email, true);
    expect(result.current.emailErrorMessage).toBe("Correo ya existe");
  });

  it("returns empty error message when email does not exist and checkExist is true", async () => {
    (
      checkUserExists as jest.MockedFunction<typeof checkUserExists>
    ).mockResolvedValue(false);

    let result: any;

    await act(async () => {
      result = renderHook(() => useCheckEmail(defaultProps.email, true)).result;
    }); 

    expect(checkUserExists).toBeCalledWith(defaultProps.email, true);
    expect(result.current.emailErrorMessage).toBe("");
  });
});