type SignUpData = {
  name: string;
  email: string;
  password: string;
  category: number[];
};

export const signup = async (signupData: SignUpData): Promise<boolean> => {
  console.log("JSON", JSON.stringify(signupData));
  const response = await fetch("http://192.168.1.6:3001/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });
  console.log("RES", response);
  const data = await response.json();
  console.log("DATA", data);
  if (response.status === 200 && data === "Usuario creado exitosamente.") {
    return true;
  } else {
    return false;
  }
};
