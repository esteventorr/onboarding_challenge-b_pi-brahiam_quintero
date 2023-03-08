import { API_URL } from "../config/config";

type LoginCredentials = {
  username: string;
  password: string;
};

export const login = async (
  credentials: LoginCredentials
): Promise<boolean> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  data.status = response.status;
  if (data.status === 200) {
    sessionStorage.setItem("access_token", data.access_token);
    return true;
  } else {
    sessionStorage.setItem("access_token", "");
    return false;
  }
};
