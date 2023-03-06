import { renderHook, act } from "@testing-library/react";
import { useCheckPassword } from "./use-check-password";

describe("useCheckPassword", () => {
  it("should set error message when password is too short", () => {
    const { result } = renderHook(() => useCheckPassword("abc"));

    expect(result.current.passwordErrorMessage).toBe(
      "La contraseña debe tener al menos 8 caracteres"
    );
  });

  it("should set error message when password does not have uppercase letter", () => {
    const { result } = renderHook(() => useCheckPassword("abcdefg1#"));

    expect(result.current.passwordErrorMessage).toBe(
      "La contraseña debe tener al menos una mayúscula"
    );
  });

  it("should set error message when password does not have number", () => {
    const { result } = renderHook(() => useCheckPassword("Abcdefgh#"));

    expect(result.current.passwordErrorMessage).toBe(
      "La contraseña debe tener al menos un número"
    );
  });

  it("should set error message when password does not have special character", () => {
    const { result } = renderHook(() => useCheckPassword("Abcdefg1"));

    expect(result.current.passwordErrorMessage).toBe(
      "La contraseña debe tener al menos un caracter especial"
    );
  });

  it("should set error message when password is empty", () => {
    const { result } = renderHook(() => useCheckPassword(""));

    expect(result.current.passwordErrorMessage).toBe("Contraseña es requerida");
  });

  it("should not set error message when password meets requirements", () => {
    const { result, rerender } = renderHook(
      ({ password }) => useCheckPassword(password),
      { initialProps: { password: "Abcdefg1#" } }
    );

    expect(result.current.passwordErrorMessage).toBe("");

    act(() => {
      rerender({ password: "AnotherPassword123#" });
    });

    expect(result.current.passwordErrorMessage).toBe("");
  });
});
