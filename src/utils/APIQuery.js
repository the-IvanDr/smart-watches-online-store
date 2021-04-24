import axios from 'axios';

export const SERVER_ADDRESS = 'http://192.168.31.180:5000';

axios.defaults.baseURL = SERVER_ADDRESS + '/api/';

export async function RegNewUser(userData) {
    return await axios.post('auth/registration', userData);
}

export async function LoginNewUser(userData) {
    return await axios.post('auth/login', userData);
}

export const Products = {
    uploadMainImage: async function (jwt, file) {
        const formData = new FormData();
        formData.append('image', file);
        return await axios.post(`admin/${jwt}/product-upload-main-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    uploadDescriptionImages: async function (jwt, files) {
        const formData = new FormData();

        Array.from(files).forEach((file, index) => {
            formData.append(`image-${index}`, file);
        });

        return await axios.post(`admin/${jwt}/product-upload-description-images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    removeMainImage: async function (jwt, imageSrc) {
        return await axios.post(`admin/${jwt}/product-remove-main-image`, imageSrc);
    },

    removeDescriptionImage: async function (jwt, imageSrc) {
        return axios.post(`admin/${jwt}/product-remove-description-image`, imageSrc);
    }
}

export const Brands = {
    uploadImage: async function (jwt, file) {
        const formData = new FormData();
        formData.append('image', file);
        return await axios.post(`admin/${jwt}/brand-upload-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    removeImage: async function (jwt, imageSrc) {
        return await axios.post(`admin/${jwt}/brand-remove-image`, imageSrc);
    },

    create: async function (jwt, form){
        return await axios.post(`admin/${jwt}/brand-create`, form);
    }
}