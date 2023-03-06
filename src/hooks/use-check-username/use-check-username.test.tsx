import { renderHook, act } from "@testing-library/react";
import { useCheckUser } from "./use-check-username";
import { checkUserExists } from "../../services/user-exist";

jest.mock("../../../../services/user-exist");

describe("useCheckUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should set error message when username is empty", async () => {
    const { result } = renderHook(() => useCheckUser("", false, true));
    expect(result.current.userErrorMessage).toBe("Correo es requerido");
  });

  it("should set error message when user does not exist", async () => {
    const mockCheckUserExists = jest.fn(() => Promise.resolve(false));
    (checkUserExists as jest.Mock).mockImplementation(mockCheckUserExists);

    const { result } = renderHook(() =>
      useCheckUser("non-existing-user@example.com", true, true)
    );

    expect(mockCheckUserExists).toHaveBeenCalledWith(
      "non-existing-user@example.com"
    );
    expect(result.current.userErrorMessage).toBe("Usuario no existe");
  });

  it("should not set error message when user exists", async () => {
    const mockCheckUserExists = jest.fn(() => Promise.resolve(true));
    (checkUserExists as jest.Mock).mockImplementation(mockCheckUserExists);

    const { result } = renderHook(() =>
      useCheckUser("existing-user@example.com", true, true)
    );

    expect(mockCheckUserExists).toHaveBeenCalledWith(
      "existing-user@example.com"
    );
    expect(result.current.userErrorMessage).toBe("");
  });
});
