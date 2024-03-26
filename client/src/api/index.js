import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import getBaseUrl from './checkEnvironment';

const baseUrl = getBaseUrl();

// auth api's
export const signupApi = async (reqBody) => {
    return axios.post(`${baseUrl}/signup`, reqBody);
};

export const loginApi = (reqBody) => {
    return axios.post(`${baseUrl}/login`, reqBody);
};

export const logoutApi = async () => {
    return axios.post(`${baseUrl}/logout`);
}

// user api's
export const getUser = async () => {
    return axios.get(`${baseUrl}/get-user`);
}

export const updateUser = async (reqBody) => {
    return axios.put(`${baseUrl}/update-user`, reqBody);
}

export const deleteUser = async () => {
    return axios.delete(`${baseUrl}/delete-user`);
}

// blog api's
export const getAllBlogs = async () => {
    return axios.get(`${baseUrl}/get-all-blogs`);
}

export const getSingleBlog = async (blogId) => {
    return axios.get(`${baseUrl}/get-single-blog/${blogId}`);
}

export const createBlog = async (reqBody) => {
    return axios.get(`${baseUrl}/create-blog`, reqBody);
}

export const updateBlog = async (blogId, reqBody) => {
    return axios.get(`${baseUrl}/update-blog/${blogId}`, reqBody);
}

export const deleteBlog = async (blogId) => {
    return axios.get(`${baseUrl}/delete-blog/${blogId}`);
}

// api for uploading images to cloudinary
export const uploadImagesToCloudinary = async (formData) => {
    return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
}

// for checking token validity
export const isCookieTokenValid = () => {
    const token = Cookies.get('token');
    const currentTime = Math.floor(Date.now() / 1000);

    if (token) {
        const decoded = jwtDecode(token);
        if (decoded?.exp > currentTime) {
            return decoded;
        }
    }
    else return false;
}