export const checkUserExists = async (username: string, isEmail: boolean): Promise<boolean> => {
  let existPath = isEmail ? "users/exist-email/?email" : "users/exist-name/?name";
  const response = await fetch(
    `http://192.168.1.6:3001/${existPath}=${username}`
  );
  const data = await response.json();
  return data.exists;
};
