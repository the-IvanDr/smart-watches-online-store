import axios from 'axios';

export const SERVER_ADDRESS = 'http://192.168.31.180:5000';

axios.defaults.baseURL = SERVER_ADDRESS + '/api/';

export async function RegNewUser(userData) {
    return await axios.post('auth/registration', userData);
}

export async function LoginNewUser(userData) {
    return await axios.post('auth/login', userData);
}


export async function UploadMainImage(jwt, file) {
    const formData = new FormData();
    formData.append('image', file);
    return await axios.post(`admin/${jwt}/product-upload-main-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function RemoveMainImage(jwt, imageSrc){
    return await axios.post(`admin/${jwt}/product-remove-main-image`, imageSrc);
}

export async function UploadDescriptionImages(jwt, files) {
    const formData = new FormData();

    Array.from(files).forEach((file, index) => {
        formData.append(`image-${index}`, file);
    });

    return await axios.post(`admin/${jwt}/product-upload-description-images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function RemoveDescriptionImage(jwt, imageSrc) {
    return axios.post(`admin/${jwt}/product-remove-description-image`, imageSrc);
}