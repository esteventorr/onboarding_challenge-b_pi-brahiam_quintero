import { checkUserExists } from "./user-exist";
import { API_URL } from "../config/config";

jest.mock("../config/config", () => ({
  API_URL: "http://192.168.1.6:3001",
}));

describe("checkUserExists function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns true when user exists", async () => {
    const username = "testuser";
    const isEmail = false;
    const expectedPath = `${API_URL}/users/exist-name/?name=${username}`;
    const mockResponse = { exists: true };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await checkUserExists(username, isEmail);

    expect(fetch).toHaveBeenCalledWith(expectedPath);
    expect(result).toBe(true);
  });

  it("returns false when user does not exist", async () => {
    const username = "nonexistentuser";
    const isEmail = false;
    const expectedPath = `${API_URL}/users/exist-name/?name=${username}`;
    const mockResponse = { exists: false };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await checkUserExists(username, isEmail);

    expect(fetch).toHaveBeenCalledWith(expectedPath);
    expect(result).toBe(false);
  });

  it("returns true when email exists", async () => {
    const email = "test@example.com";
    const isEmail = true;
    const expectedPath = `${API_URL}/users/exist-email/?email=${email}`;
    const mockResponse = { exists: true };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await checkUserExists(email, isEmail);

    expect(fetch).toHaveBeenCalledWith(expectedPath);
    expect(result).toBe(true);
  });

  it("returns false when email does not exist", async () => {
    const email = "nonexistent@example.com";
    const isEmail = true;
    const expectedPath = `${API_URL}/users/exist-email/?email=${email}`;
    const mockResponse = { exists: false };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await checkUserExists(email, isEmail);

    expect(fetch).toHaveBeenCalledWith(expectedPath);
    expect(result).toBe(false);
  });
});
