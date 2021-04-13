import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.31.180:5000/api/';

export async function RegNewUser(userData) {
    return await axios.post('auth/registration', userData);
    // try {
    //     return await axios.post('auth/registration', userData);

    // } catch (error) {
    //     if (error.response) {
    //         console.log(error.response.data);
    //         alert(error.response.data.message);
    //     } else {
    //         console.log(error);
    //         alert(error);
    //     }
    // }
}

export async function LoginNewUser(userData) {
    try {
        const response = await axios.post('auth/login', userData);
        console.log('response: ', response);

    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            alert(error.response.data.message);
        } else {
            console.log(error);
            alert(error);
        }
    }
}