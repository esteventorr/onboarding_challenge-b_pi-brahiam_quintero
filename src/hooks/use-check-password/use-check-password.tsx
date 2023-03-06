import { useEffect, useState } from "react";

export const useCheckPassword = (password: string) => {
  const regexMayuscula = /[A-Z]/;
  const regexNumero = /\d/;
  const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  useEffect(() => {
    const checkUserExists = async () => {
      setPasswordErrorMessage("");
      try {
        if (password.length < 8) {
          setPasswordErrorMessage(
            "La contraseña debe tener al menos 8 caracteres"
          );
        } else if (!regexMayuscula.test(password)) {
          setPasswordErrorMessage(
            "La contraseña debe tener al menos una mayúscula"
          );
        } else if (!regexNumero.test(password)) {
          setPasswordErrorMessage(
            "La contraseña debe tener al menos un número"
          );
        } else if (!regexEspecial.test(password)) {
          setPasswordErrorMessage(
            "La contraseña debe tener al menos un caracter especial"
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (password.trim()) {
      checkUserExists();
    } else {
      setPasswordErrorMessage("Contraseña es requerida");
    }
  }, [password]);

  return { passwordErrorMessage };
};
