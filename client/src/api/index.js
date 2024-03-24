import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import getBaseUrl from './checkEnvironment';

const baseUrl = getBaseUrl();

// auth api's
export const signupApi = async (data) => {
    return axios.post(`${baseUrl}/signup`, data);
};

export const loginApi = (data) => {
    return axios.post(`${baseUrl}/login`, data);
};

export const logoutApi = () => {
    return axios.post(`${baseUrl}/logout`);
}

// user api's
export const getUser = () => {
    return axios.get(`${baseUrl}/get-user`);
}

export const updateUser = (data) => {
    return axios.put(`${baseUrl}/update-user`, data);
}

export const deleteUser = () => {
    return axios.delete(`${baseUrl}/delete-user`);
}

// blog api's
export const getAllBlogs = () => {
    return axios.get(`${baseUrl}/get-all-blogs`);
}

export const getSingleBlog = (blogId) => {
    return axios.get(`${baseUrl}/get-single-blog/${blogId}`);
}

export const createBlog = (data) => {
    return axios.get(`${baseUrl}/create-blog`, data);
}

export const updateBlog = (blogId, data) => {
    return axios.get(`${baseUrl}/update-blog/${blogId}`, data);
}

export const deleteBlog = (blogId) => {
    return axios.get(`${baseUrl}/delete-blog/${blogId}`);
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