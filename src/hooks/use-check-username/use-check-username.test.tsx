import { render, renderHook, waitFor } from "@testing-library/react";
import useCheckUser, { validateUsername } from "./use-check-username";
import { checkUserExists } from "../../services/user-exist";
import { act } from "react-dom/test-utils";

jest.mock("../../services/user-exist", () => ({
  checkUserExists: jest.fn(),
}));

describe("validateUsername", () => {
  it("returns an error message if username is empty", () => {
    const result = validateUsername("", false);
    expect(result).toBe("Usuario es requerido");
  });

  it("returns an error message if username does not start with a letter", () => {
    const result = validateUsername("1abc", false);
    expect(result).toBe(
      "El nombre de usuario debe empezar con una letra y contener solo letras y números"
    );
  });

  it("returns an error message if username contains special characters", () => {
    const result = validateUsername("abc@", false);
    expect(result).toBe(
      "El nombre de usuario debe empezar con una letra y contener solo letras y números"
    );
  });

  it("does not return an error message if bypassRegex is true", () => {
    const result = validateUsername("abc@", true);
    expect(result).toBe("");
  });

  it("does not return an error message if username is valid", () => {
    const result = validateUsername("abc123", false);
    expect(result).toBe("");
  });
});

describe("useCheckUser", () => {
  const defaultProps = {
    username: "testuser",
    bypassRegex: false,
    shouldExist: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty error message when username is valid and shouldExist is false", async () => {
    const { result } = renderHook(() =>
      useCheckUser(
        defaultProps.username,
        defaultProps.bypassRegex,
        defaultProps.shouldExist
      )
    );

    await waitFor(() =>
      expect(checkUserExists).toBeCalledWith(
        defaultProps.username,
        defaultProps.bypassRegex
      )
    );
    expect(result.current.userErrorMessage).toBe("");
  });

  it("returns error message when username is invalid and shouldExist is false", () => {
    const { result } = renderHook(() =>
      useCheckUser("", defaultProps.bypassRegex, defaultProps.shouldExist)
    );

    expect(result.current.userErrorMessage).toBe("Usuario es requerido");
  });

  it("returns empty error message when username exists and shouldExist is true", async () => {
    (
      checkUserExists as jest.MockedFunction<typeof checkUserExists>
    ).mockResolvedValue(true);

    let result:any;

    await act(async () => {
      result = renderHook(() =>
        useCheckUser(defaultProps.username, defaultProps.bypassRegex, true)
      ).result;
    });

    await waitFor(() =>
      expect(checkUserExists).toBeCalledWith(
        defaultProps.username,
        defaultProps.bypassRegex
      )
    );
    expect(result.current.userErrorMessage).toBe("");
  });

  it("returns error message when username exists and shouldExist is false", async () => {
    (
      checkUserExists as jest.MockedFunction<typeof checkUserExists>
    ).mockResolvedValue(true);

    let result:any;

    await act(async () => {
      result = renderHook(() =>
        useCheckUser(defaultProps.username, defaultProps.bypassRegex, false)
      ).result;
    });

    await waitFor(() =>
      expect(checkUserExists).toBeCalledWith(
        defaultProps.username,
        defaultProps.bypassRegex
      )
    );
    expect(result.current.userErrorMessage).toBe("Usuario ya existe");
  });

  it("returns error message when username does not exist and shouldExist is true", async () => {
    (
      checkUserExists as jest.MockedFunction<typeof checkUserExists>
    ).mockResolvedValue(false);

    let result:any;

    await act(async () => {
      result = renderHook(() =>
        useCheckUser(defaultProps.username, defaultProps.bypassRegex, true)
      ).result;
    });

    await waitFor(() =>
      expect(checkUserExists).toBeCalledWith(
        defaultProps.username,
        defaultProps.bypassRegex
      )
    );
    expect(result.current.userErrorMessage).toBe("Usuario no existe");
  }); 
});