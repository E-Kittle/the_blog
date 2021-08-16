// This file uses axios for registering, logging in, and logging out the user
// It also contains a method for getting the current users information
import axios from "axios";
import authHeader from './auth-header';

const API_URL = "https://peaceful-wave-73796.herokuapp.com/api/auth/";

// To register a user
const register = (username, email, password, commenting) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    commenting
  });
};


//To login a user
const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })

    // API call was successful, set the token in local storage and return the response
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    })

    // API call failed, return the error with appropriate data
    .catch((err) => {
      return err.response;
    })
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authenticateUser = (dispatch) => {

  const config = authHeader();

  if(config.headers !== undefined) {
    axios.get(API_URL+'userAuth', config)
    .then(request => {
      dispatch({ type: 'setUser', payload:request.data.user })
    })
    .catch(err => {
      if (err.response.status === 401) {  
        // A token exists from a previous authentication but is no longer valid, remove from localStorage
        logout();
      }
      console.log(err.response)
    })
  }
  else {
    return;
  }
}

export {
  register,
  login,
  logout,
  getCurrentUser,
  authenticateUser
};
