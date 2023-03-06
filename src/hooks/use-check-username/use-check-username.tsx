import { useEffect, useState } from "react";
import { checkUserExists } from "../../services/user-exist";

export const useCheckUser = (
  username: string,
  bypassRegex: boolean,
  shouldExist: boolean
) => {
  const [userErrorMessage, setUserErrorMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (username.trim()) {
          if (!bypassRegex) {
            const userRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
            if (!userRegex.test(username)) {
              setUserErrorMessage(
                "El nombre de usuario debe empezar con una letra y contener solo letras y números"
              );
              return;
            }
          }

          const exists = await checkUserExists(username, bypassRegex);
          if (exists) {
            setUserErrorMessage(shouldExist ? "" : "Usuario ya existe");
          } else {
            setUserErrorMessage(shouldExist ? "Usuario no existe" : "");
          }
        } else {
          setUserErrorMessage("Usuario es requerido");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkUser();
  }, [username]);

  return { userErrorMessage };
};
