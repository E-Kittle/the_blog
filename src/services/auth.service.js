// This file uses axios for registering, logging in, and logging out the user
// It also contains a method for getting the current users information
import axios from "axios";

const API_URL = "https://peaceful-wave-73796.herokuapp.com/api/auth/";

const register = (username, email, password, commenting) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    commenting
  });
};

// const login = (username, password) => {
//   return axios
//     .post(API_URL + "login", {
//       username,
//       password,
//     })
//     .then((response) => {
//       console.log('in auth.service')
//       if (response.data.token) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     })
//     // .catch(error => console.log(error)
//     // );
// };

//My OWN attempt
const login = (username, password) => {
  axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      console.log('in auth.service')
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    })
    // .catch(error => console.log(error)
    // );
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export {
  register,
  login,
  logout,
  getCurrentUser,
};