import { API_URL } from "../config/config";

export const checkUserExists = async (
  username: string,
  isEmail: boolean
): Promise<boolean> => {
  let existPath = isEmail
    ? "users/exist-email/?email"
    : "users/exist-name/?name";
  const response = await fetch(`${API_URL}/${existPath}=${username}`);
  const data = await response.json();
  return data.exists;
};
