import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.31.180:5000/api/';

export async function RegNewUser(userData) {
    return await axios.post('auth/registration', userData);
}

export async function LoginNewUser(userData) {
    return await axios.post('auth/login', userData);
}

export async function getUserData(token) {
    return await axios.get(`user/${token}/getdata`);
}