type LoginCredentials = {
  username: string;
  password: string;
};

export const login = async (
  credentials: LoginCredentials
): Promise<boolean> => {
  const response = await fetch("http://192.168.1.6:3001/users/login", {
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
