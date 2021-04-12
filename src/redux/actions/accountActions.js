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

    return [isValid, regData.errors];
}



export const login = () => async dispatch => {
    dispatch({
        type: types.AUTH_LOGIN,
        payload: {}
    });
}

export const registration = (regData) => async dispatch => {
    const [isValid, errors] = RegValidation(regData);
    if (!isValid) {
        return dispatch({
            type: types.AUTH_INVALID_REG_INPUT,
            payload: {
                errors
            }
        })
    } else {
        delete regData.errors;
        await APIQuery.RegNewUser(regData);
    }

}