// This file contains methods for making API calls
// 

import axios from 'axios'; 
import authHeader from '../services/auth-header'
const API_URL = "https://peaceful-wave-73796.herokuapp.com/api";


// These methods are used on the homepage
// Retrieves all published posts 
const getAllPosts = () => {
    return axios.get(`${API_URL}/posts`)
}

// Retrieves all categories and subcategories from the db
const getAllCategories = () => {
    return axios.get(`${API_URL}/categories`)
}

//Retrieves all published posts for a specific category
const getPostsByCategory = (cat) => {
    return axios.get(`${API_URL}/posts/category/${cat}`)
}

// Retrieves all published posts for a specific subcategory
const getPostsBySubCategory = (cat, subcat) => {
    return axios.get(`${API_URL}/posts/category/${cat}/${subcat}`)
}


// The following two methods are used on the page for a specific post
// Retrieves the specific post data
const getPost = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}`);
}

// Retrives the comments for a specific post
const getComments = (postId) => {
    return axios.get(`${API_URL}/posts/${postId}/comments`);
}

const postComment = (postId, author, body) => {
    return axios.post(`${API_URL}/posts/${postId}/comments`, {author:author, comment:body});
}

const getProfile = (userId) => {
    const config = authHeader();
    return axios.get(`${API_URL}/user/${userId}`, config);
}

const postUserSignUp = (user) => {
    return axios.post(`${API_URL}/auth/signup`, user)
}

const postLogin = (user) => {
    return axios.post(`${API_URL}/auth/login`, user) 
}

const getUserPosts = (user) => {
    const config = authHeader();
    return axios.get(`${API_URL}/user/${user.id}/posts`, config)
}
export { getAllPosts, getUserPosts, postUserSignUp, postLogin, getPost, getComments, postComment, getProfile,
         getAllCategories, getPostsByCategory, getPostsBySubCategory };