import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

export async function RegNewUser(userData) {
    try {
        const response = await axios.post('auth/registration', userData);
        console.log('response: ', response);

    } catch (error) {
        console.error(error.response.data);
        alert(error.response.data.message);
    }
}