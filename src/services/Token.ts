export const tokenService = {
  getToken: () => {
    return localStorage.getItem("token");
  },
  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },
};
