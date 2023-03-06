import { useEffect, useState } from "react";
import { checkUserExists } from "../../services/user-exist";

export const useCheckEmail = (email: string, checkExist: boolean) => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  useEffect(() => {
    const validateEmail = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.trim()) {
        if (emailRegex.test(email.trim())) {
            
          if (checkExist) {
            const exists = await checkUserExists(email, true);
            if (exists) {
              setEmailErrorMessage("Correo ya existe");
            } else {
              setEmailErrorMessage("");
            }
          } else {
            setEmailErrorMessage("");
          }
        } else {
          setEmailErrorMessage("Formato de correo electrónico inválido");
        }
      } else {
        setEmailErrorMessage("Correo Electrónico es requerido");
      }
    };

    validateEmail();
  }, [email]);

  return { emailErrorMessage };
};
