// This file contains methods for making API calls
// 

import axios from 'axios';

const API_URL = "https://peaceful-wave-73796.herokuapp.com/api";

const getAllPosts = () => {
    return axios.get(`${API_URL}/posts`)
}

const getPost = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}`);
}

const getComments = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}/comments`);
}

const postComment = (postId, author, body) => {
    return axios.post(`${API_URL}/posts/${postId}/comments`, {author:author, comment:body});
}

const getProfile = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`);
}

const postUserSignUp = (user) => {
    return axios.post(`${API_URL}/auth/signup`, user)
}

const postLogin = (user) => {
    return axios.post(`${API_URL}/auth/login`, user) 
}

const getUserPosts = (user) => {
    return axios.get(`${API_URL}/user/${user.id}/posts`)
}
export { getAllPosts, getUserPosts, postUserSignUp, postLogin, getPost, getComments, postComment, getProfile };