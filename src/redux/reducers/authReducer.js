import * as types from '../types.js';

const initialState = {
    authData: {
        userId: null,
        jwtToken: null,
        basket: [],
        desires: [],
        orders: []
    },

    inputs: {
        registerFields: {
            fName: 'Иван',
            lName: 'Дрыга',
            mName: 'Андреевич',
            email: 'driga.ya27@gmail.com',
            password: 'LhsueyDfYbZf123123123$$$',
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
                email: '',
                password: ''
            }
        }
    }
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.INPUTS_REG_CHANGE:
            console.log('INPUTS_REG_CHANGE: ', action);
            return {
                authData: state.authData,
                
                inputs: {
                    loginFields: state.inputs.loginFields,
                    registerFields: {
                        ...state.inputs.registerFields,
                        [action.payload.name]: action.payload.value,
                        errors: {
                            ...state.inputs.registerFields.errors,
                            [action.payload.name]: ''
                        }
                    }

                }
            }

        case types.INPUTS_LOG_CHANGE:
            console.log('INPUTS_LOG_CHANGE');
            return {
                authData: state.authData,

                inputs:{
                    registerFields: state.inputs.registerFields,
                    loginFields: {
                        ...state.inputs.loginFields,
                        [action.payload.name]: action.payload.value,
                        errors: {
                            ...state.inputs.loginFields.errors,
                            [action.payload.name]: ''
                        }
                    }

                }
            }

        case types.AUTH_INVALID_REG_INPUT:
            console.log('AUTH_INVALID_INPUT');
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    registerFields: {
                        ...state.inputs.registerFields,
                        errors: action.payload.errors
                    }
                }
            }
        
        default: return state;
    }
}