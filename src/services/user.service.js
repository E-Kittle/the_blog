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

// Creates a new comment
const postComment = (postId, author, body) => {
    return axios.post(`${API_URL}/posts/${postId}/comments`, { author: author, comment: body });
}

// Creates a new post
const postNewPost = (newPost) => {
    const config = authHeader();
    return axios.post(`${API_URL}/posts`, newPost, config);
}

// Deletes a post
const deletePost = (postid) => {
    const config = authHeader();
    return axios.delete(`${API_URL}/posts/${postid}`, config)
}

// Put method to update an existing post
const editPost = (postid, data) => {
    const config = authHeader();
    return axios.put(`${API_URL}/posts/${postid}`, data, config )
}

// GET method to retrieve a users profile
const getProfile = (userId) => {
    const config = authHeader();
    return axios.get(`${API_URL}/user/${userId}`, config);
}

//  POST method to signup a user
const postUserSignUp = (user) => {
    return axios.post(`${API_URL}/auth/signup`, user)
}

// POST method to login a user
const postLogin = (user) => {
    return axios.post(`${API_URL}/auth/login`, user)
}

// GET method to get posts based on user
const getUserPosts = (user) => {
    const config = authHeader();
    return axios.get(`${API_URL}/user/${user.id}/posts`, config)
}

// Post method to create a new category
const postCategory = (name) => {
    const config = authHeader();
    let category = {name}
    return axios.post(`${API_URL}/categories`, category, config)
}

// POST method to create a new subcategory
const postSubCategory = (catId, subcat) => {
    console.log(`adding ${subcat} to ${catId}`)
    const config = authHeader();
    return axios.post(`${API_URL}/categories/${catId}/subcategory`, {subcategory: subcat}, config)
}


export {
    getAllPosts, getUserPosts, postUserSignUp, postLogin, getPost, getComments, postComment, getProfile,
    getAllCategories, getPostsByCategory, getPostsBySubCategory, postNewPost, deletePost, editPost, postCategory, postSubCategory 
};