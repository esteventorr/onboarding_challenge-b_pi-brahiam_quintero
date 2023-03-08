import { login } from "./login";

describe("login function", () => {
  it("returns true and sets access_token in sessionStorage if login is successful", async () => {
    const credentials = {
      username: "albert-dominguez@gmail.com",
      password: "blkPDM.22",
    };
    const result = await login(credentials);
    expect(result).toBe(true);
    let token = sessionStorage.getItem("access_token");
    expect(
      token && typeof token === "string" && token.length > 12
    ).toBeTruthy();
  });

  it("returns false and does not set access_token in sessionStorage if login is unsuccessful", async () => {
    const credentials = {
      username: "invaliduser",
      password: "invalidpassword",
    };
    const result = await login(credentials);
    expect(result).toBe(false);
    expect(sessionStorage.getItem("access_token")).toBe("");
  });
});
