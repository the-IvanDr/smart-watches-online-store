import * as types from '../types.js';
import {useSelector} from 'react-redux';

const initialState = {
    registerFields: {
        fName: '',
        lName: '',
        mName: '',
        email: '',
        password: '',
        errors: {
            fName: '',
            lName: '',
            mName: '',
            email: '',
            password: ''
        }
    },

    loginFields: {
        email: '',
        password: '',
        errors: {
            email: false,
            password: false
        }
    }
};

export default function inputsReducer(state = initialState, action) {
    switch (action.type) {
        case types.INPUTS_REG_CHANGE:
            console.log('INPUTS_REG_CHANGE: ', action);
            return {
                loginFields: state.loginFields,
                registerFields: {
                    ...state.registerFields,
                    [action.payload.name]: action.payload.value
                }               
            }

        case types.INPUTS_LOG_CHANGE:
            console.log('INPUTS_LOG_CHANGE');
            return {
                registerFields: state.registerFields,
                loginFields: {
                    ...state.loginFields,
                    [action.payload.name]: action.payload.value
                }
            }

        default: return state;
    }
}