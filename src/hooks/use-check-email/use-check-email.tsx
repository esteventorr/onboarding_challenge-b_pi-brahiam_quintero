import { useCallback, useEffect, useState } from "react";
import { checkUserExists } from "../../services/user-exist";

export const useCheckEmail = (email: string, checkExist: boolean) => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const validateEmail = useCallback(async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailErrorMessage("Correo Electrónico es requerido");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setEmailErrorMessage("Formato de correo electrónico inválido");
      return;
    }

    if (checkExist) {
      const exists = await checkUserExists(email, true);

      if (exists) {
        setEmailErrorMessage("Correo ya existe");
        return;
      }
    }

    setEmailErrorMessage("");
  }, [email, checkExist]);

  useEffect(() => {
    validateEmail();
  }, [email, checkExist, validateEmail]);

  return { emailErrorMessage, validateEmail };
};
