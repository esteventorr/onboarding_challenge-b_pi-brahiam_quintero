import { API_URL } from "../config/config";

export type SignUpData = {
  name: string;
  email: string;
  password: string;
  category: number[];
};

export const signup = async (signupData: SignUpData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (response.status === 200 && data === "Usuario creado exitosamente.") {
      return true;
    } else { 
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
