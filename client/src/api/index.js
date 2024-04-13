import axios from 'axios';
import Cookies from 'js-cookie';

// auth api`s
export const signupApi = async (reqBody) => {
    return axios.post(`/api/signup`, reqBody);
};

export const loginApi = (reqBody) => {
    return axios.post(`/api/login`, reqBody);
};

export const logoutApi = async () => {
    return axios.post(`/api/logout`);
}

// user api`s
export const getUser = async (userId) => {
    return axios.get(`/api/get-user/${userId}`);
}

export const updateUser = async (reqBody) => {
    return axios.put(`/api/update-user`, reqBody);
}

export const deleteUser = async () => {
    return axios.delete(`/api/delete-user`);
}

// blog api`s
export const getAllBlogs = async () => {
    return axios.get(`/api/get-all-blogs`);
}

export const getSingleBlog = async (blogId) => {
    return axios.get(`/api/get-single-blog/${blogId}`);
}

export const createBlog = async (reqBody) => {
    return axios.post(`/api/create-blog`, reqBody);
}

export const updateBlog = async (blogId, reqBody) => {
    return axios.put(`/api/update-blog/${blogId}`, reqBody);
}

export const deleteBlog = async (blogId) => {
    return axios.delete(`/api/delete-blog/${blogId}`);
}

// api for uploading images to cloudinary
export const uploadImageToCloudinary = async (formData) => {
    return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
}

// api for sending emails through nodemailer
export const sendEmail = async (reqBody) => {
    return axios.post(`/api/send-email`, reqBody);
}

// for checking token validity
export const isCookieTokenValid = () => {
    const token = Cookies.get(`access_token`);
    if (token) return true;
    else return false;
}