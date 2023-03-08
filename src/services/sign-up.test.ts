import { signup } from "./sign-up";
import { API_URL } from "../config/config";

describe("signup function", () => {
  let mockFetchFunction: jest.Mock;

  beforeEach(() => {
    mockFetchFunction = jest.fn();
    global.fetch = mockFetchFunction;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return true if signup is successful", async () => {
    const uniqueId = Date.now().toString(); // or use a UUID library
    const signupData = {
      name: `jest_mock_${uniqueId}`,
      email: `jest_mock_${uniqueId}@example.com`,
      password: "blnPDM.25",
      category: [1, 2, 3],
    };
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue("Usuario creado exitosamente."),
    };
    mockFetchFunction.mockResolvedValue(mockResponse);

    const result = await signup(signupData); 

    expect(mockFetchFunction).toHaveBeenCalledWith(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    expect(result).toBe(true);
  });

  it("should return false if signup is unsuccessful", async () => {
    const signupData = {
      name: "John",
      email: "john@example.com",
      password: "password",
      category: [1, 2, 3],
    };
    const mockResponse = {
      status: 500,
      json: jest.fn().mockResolvedValue("Error creando usuario."),
    };
    mockFetchFunction.mockResolvedValue(mockResponse);

    const result = await signup(signupData);

    expect(mockFetchFunction).toHaveBeenCalledWith(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    expect(result).toBe(false);
  });
});
