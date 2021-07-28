// This file contains methods for making API calls
// 

import axios from 'axios';

const API_URL = "https://peaceful-wave-73796.herokuapp.com/api";

const getAllPosts = () => {
    return axios.get(`${API_URL}/posts`)
}


const postUserSignUp = (user) => {
    return axios.post(`${API_URL}/auth/signup`, user)
}

const postLogin = (user) => {
    return axios.post(`${API_URL}/auth/login`, user) 
}
export { getAllPosts, postUserSignUp, postLogin };