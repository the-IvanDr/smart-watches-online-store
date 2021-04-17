import * as types from '../types.js';
import validator from 'validator';
import * as APIQuery from './../../utils/APIQuery';

const RegValidation = (regData) => {
    let isValid = true;

    // Check the user's second name
    if (!validator.isAlpha(regData.lName, ['uk-UA']) && !validator.isAlpha(regData.lName, ['ru-RU'])) {
        regData.errors.lName = 'Фамилия должна состоять только из букв (укр. рус.)!';
        isValid = false;
    }

    if (!validator.isLength(regData.lName, { min: 2, max: 20 })) {
        regData.errors.lName = 'Фамилия должна состоять из 2-20 символов!';
        isValid = false;
    }

    // Check the user's first name
    if (!validator.isAlpha(regData.fName, ['uk-UA']) && !validator.isAlpha(regData.fName, ['ru-RU'])) {
        regData.errors.fName = 'Имя должно состоять только из букв (укр. рус.)!';
        isValid = false;
    }

    if (!validator.isLength(regData.fName, { min: 2, max: 20 })) {
        regData.errors.fName = 'Имя должно состоять из 2-20 символов!';
        isValid = false;
    }

    // Check the user's e-mail
    if (!validator.isEmail(regData.email)) {
        regData.errors.email = 'Некорректный e-mail!';
        isValid = false;
    }

    // Check the user's password
    if (!validator.isStrongPassword(regData.password)) {
        regData.errors.password = 'Пароль: мин. 8 символов, нижний и верхний регистр, цифры и спец. символы!';
        isValid = false;
    }

    // Check passwrod confirmation
    if (!validator.equals(regData.password, regData.confirmPassword)) {
        regData.errors.confirmPassword = 'Пароли не сопадают!';
        isValid = false;
    }

    return [isValid, regData.errors];
}

const LogValidation = (logData) => {
    let isValid = true;

    // Check the user's e-mail
    if (!validator.isEmail(logData.email)) {
        logData.errors.email = 'Некорректный e-mail!';
        isValid = false;
    }

    // Check the user's password
    if (!validator.isLength(logData.password, { min: 1 })) {
        logData.errors.password = 'Введите пароль!';
        isValid = false;
    }

    return [isValid, logData.errors];
}



export const login = (logData) => async dispatch => {
    const [isValid, errors] = LogValidation(logData);
    if (!isValid) {
        return dispatch({
            type: types.AUTH_INVALID_LOG_INPUT,
            payload: { errors }
        });

    } else {

        delete logData.errors;

        try {
            const response = await APIQuery.LoginNewUser(logData);

            if (response.data.success) {
                return dispatch({
                    type: types.AUTH_LOG_SUCCESS,
                    payload: { 
                        token: response.data.token,
                        userData: response.data.userData            
                    }
                });
            } else throw new Error(response.data.message);

        } catch (error) {
            return dispatch({
                type: types.AUTH_LOG_ERROR,
                payload: {
                    errorMessage: error.response ? error.response.data.message : error.message
                }
            });
        }
    }
}

export const registration = (regData) => async dispatch => {
    const [isValid, errors] = RegValidation(regData);

    // If form is not valid, dispatch AUTH_INVALID_REG_INPUT action
    if (!isValid) {
        return dispatch({
            type: types.AUTH_INVALID_REG_INPUT,
            payload: { errors }
        });

    } else {

        delete regData.errors;

        try {
            const response = await APIQuery.RegNewUser(regData);

            if (response.data.success) {
                return dispatch({
                    type: types.AUTH_REG_SUCCESS,
                    payload: { 
                        token: response.data.token,
                        userData: response.data.userData
                    }
                });
            } else throw new Error(response.data.message);

        } catch (error) {
            return dispatch({
                type: types.AUTH_REG_ERROR,
                payload: {
                    errorMessage: error.response ? error.response.data.message : error.message
                }
            });
        }
    }

}

export const logout = () => {
    return { type: types.AUTH_LOGOUT }
}


// maybe delete this?
export const getUserData = (token) => async dispatch => {
    const response = await APIQuery.getUserData(token);
    console.log("USER DATA: ", response.data);
}