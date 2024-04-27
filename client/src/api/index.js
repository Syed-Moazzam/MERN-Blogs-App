import axios from 'axios';

// auth api(s)
export const signupApi = async (reqBody) => {
    return axios.post(`/api/signup`, reqBody);
};

export const loginApi = (reqBody) => {
    return axios.post(`/api/login`, reqBody);
};

export const logoutApi = async () => {
    return axios.post(`/api/logout`);
}

// user api(s)
export const getUser = async (userId) => {
    return axios.get(`/api/get-user/${userId}`);
}

export const updateUser = async (userId, reqBody) => {
    return axios.put(`/api/update-user/${userId}`, reqBody);
}

export const deleteUser = async (userId) => {
    return axios.delete(`/api/delete-user/${userId}`);
}

// blog api(s)
export const getAllBlogs = async () => {
    return axios.get(`/api/get-all-blogs`);
}

export const getSingleBlogWithComments = async (blogId) => {
    return axios.get(`/api/get-single-blog/${blogId}`);
}

export const getFilteredBlogs = (blogTitle, categoryName) => {
    if (blogTitle) return axios.get(`/api/get-filtered-blogs?blogTitle=${blogTitle}`);
    else return axios.get(`/api/get-filtered-blogs?category=${categoryName}`);
}

export const createBlog = async (reqBody) => {
    return axios.post(`/api/create-blog`, reqBody);
}

export const updateBlog = async (blogId, reqBody) => {
    return axios.put(`/api/update-blog/${blogId}`, reqBody);
}

export const deleteBlog = async (authorId, blogId) => {
    return axios.delete(`/api/delete-blog/${authorId}/${blogId}`);
}

// comment api(s)
export const createComment = async (reqBody) => {
    return axios.post(`/api/create-comment`, reqBody);
}

export const updateComment = async (commentId, reqBody) => {
    return axios.put(`/api/update-comment/${commentId}`, reqBody);
}

export const deleteComment = async (commentId) => {
    return axios.delete(`/api/delete-comment/${commentId}`);
}

// api for uploading images to cloudinary
export const uploadImageToCloudinary = async (formData) => {
    return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
}

// api for sending emails through nodemailer
export const sendEmail = async (reqBody) => {
    return axios.post(`/api/send-email`, reqBody);
}