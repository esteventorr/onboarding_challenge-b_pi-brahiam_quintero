import { useCallback, useEffect, useState } from "react";
import { checkUserExists } from "../../services/user-exist";

export const validateUsername = (username: string, bypassRegex: boolean) => {
  if (!username.trim()) {
    return "Usuario es requerido";
  }

  if (!bypassRegex) {
    const userRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!userRegex.test(username)) {
      return "El nombre de usuario debe empezar con una letra y contener solo letras y números";
    }
  }

  return "";
};

const useCheckUser = (
  username: string,
  bypassRegex: boolean,
  shouldExist: boolean,
  checkUserExistsFn: typeof checkUserExists = checkUserExists
) => {
  const [userErrorMessage, setUserErrorMessage] = useState("");

  const checkUser = useCallback( async () => { 
    try {
      setUserErrorMessage("");
      const errorMessage = validateUsername(username, bypassRegex);
      if (errorMessage) {
        setUserErrorMessage(errorMessage);
        return;
      }

      const exists = await checkUserExistsFn(username, bypassRegex);
      if (exists && !shouldExist) {
        setUserErrorMessage("Usuario ya existe");
      } else if (!exists && shouldExist) {
        setUserErrorMessage("Usuario no existe");
      } else {
        setUserErrorMessage("");
      }
    } catch (error) {
      console.error(error);
      setUserErrorMessage("");
    }
  }, [username, bypassRegex, shouldExist, checkUserExistsFn]);

  useEffect(() => {
    checkUser();
  }, [username, checkUser]);

  return { userErrorMessage, checkUser };
};

export default useCheckUser;
