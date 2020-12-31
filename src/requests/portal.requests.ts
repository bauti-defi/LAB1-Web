const axios = require("axios").default;

export const logIn = (email: string, password: string) =>
  axios({
    method: "post",
    url: "http://localhost:3000/auth/login",
    data: { email, password },
  });

export const register = () => null;
