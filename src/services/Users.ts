import { fetcher } from "./Fetcher";

export interface User {
    address: {
        geolocation: {
            lat: string;
            long: string;
        };
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    phone: string;
}


export type CreateUserData = Pick<User, 'id' | 'email' | 'password' | 'username'>;
export type UpdateUserData = Pick<User, 'name' | 'email'>;

const API_URL: string = 'https://fakestoreapi.com';

/**
 * https://fakestoreapi.com/users
 * @returns Promise<User[]>
 */
export function getUsers() {
  return fetcher<User[]>(`${API_URL}/users`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}


/**
 * https://fakestoreapi.com/users/{id}
 * @param id - The ID of the user to fetch
 * @returns 
 */
export function getUserById(id: number) {
  return fetcher<User>(`${API_URL}/users/${id}`)
    .then((response) => {
        return response;
    })
    .catch((error) => {
      throw error;
    });
}


/**
 * https://fakestoreapi.com/users/
 * @param userData - The data for the new user to be created
 * @returns 
 */
export function createUser(userData: CreateUserData) {
  return fetcher<CreateUserData>(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((response) => {
       return response;
    })
    .catch((error) => {
      throw error;
    });
}

 /**
 * https://fakestoreapi.com/users/{id}
 * @param id - The ID of the user to update
 * @param userData - The updated user data
 * @returns 
 */
export function updateUser(id: number, userData: UpdateUserData) {
  return fetcher(`${API_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * https://fakestoreapi.com/users/{id}
 * @param id - The ID of the user to delete
 * @returns 
 */
export function deleteUser(id: number) {
  return fetcher(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  }

