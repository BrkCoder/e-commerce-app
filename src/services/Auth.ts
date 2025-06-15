import { fetcher } from "./Fetcher";
import { getUserById, type User } from "./Users";

const API_URL: string = "https://fakestoreapi.com";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

/**
 * https://fakestoreapi.com/auth/login
 * @param loginData
 * @returns
 */
export function login(loginData: LoginPayload) {
  return fetcher<LoginResponse>(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
  }).then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function handleAuthLogin(response: LoginPayload, successCallback: (response: LoginResponse) => void, errorCallback: (error: Error) => void) {
    return login(response)
      .then((loginResponse) => {
        successCallback(loginResponse);
        return loginResponse;
      })
      .catch((error) => {
        errorCallback(error);
        return error;
      });
  };

  export function handleAuthProfile(id: number, successCallback: (profile: User) => void, errorCallback: (error: Error) => void) {
    return getUserById(id)
      .then((profile) => {
        successCallback(profile);
      })
      .catch((error) => {
        errorCallback(error);
      });
  };
