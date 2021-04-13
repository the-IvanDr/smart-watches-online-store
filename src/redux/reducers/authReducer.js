import * as types from '../types.js';

const initialState = {
    authData: {
        userId: null,
        jwtToken: null,
        basket: [],
        desires: [],
        orders: []
    },

    forms: {
        register: {
            fName: 'Иван',
            lName: 'Дрыга',
            mName: 'Андреевич',
            email: 'driga.ya27@gmail.com',
            password: 'LhsueyDfYbZf123123123$$$',
            confirmPassword: 'LhsueyDfYbZf123123123$$$',
            errors: {
                main: '',
                fName: '',
                lName: '',
                mName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            success: false
        },

        login: {
            email: '',
            password: '',
            errors: {
                main: '',
                email: '',
                password: ''
            },
            success: false
        }
    }
};


export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.INPUTS_REG_CHANGE:
            console.log('INPUTS_REG_CHANGE: ', action);
            return {
                authData: state.authData,

                forms: {
                    login: state.forms.login,
                    register: {
                        ...state.forms.register,
                        [action.payload.name]: action.payload.value,
                        errors: {
                            ...state.forms.register.errors,
                            [action.payload.name]: ''
                        }
                    }

                }
            }

        case types.INPUTS_LOG_CHANGE:
            console.log('INPUTS_LOG_CHANGE');
            return {
                authData: state.authData,

                forms: {
                    register: state.forms.register,
                    login: {
                        ...state.forms.login,
                        [action.payload.name]: action.payload.value,
                        errors: {
                            ...state.forms.login.errors,
                            [action.payload.name]: ''
                        }
                    }

                }
            }

        case types.AUTH_INVALID_REG_INPUT:
            console.log('AUTH_INVALID_REG_INPUT');
            return {
                ...state,
                forms: {
                    ...state.forms,
                    register: {
                        ...state.forms.register,
                        errors: action.payload.errors
                    }
                }
            }

        case types.AUTH_INVALID_LOG_INPUT:
            console.log('AUTH_INVALID_LOG_INPUT');
            return {
                ...state,
                forms: {
                    ...state.forms,
                    login: {
                        ...state.forms.login,
                        errors: action.payload.errors
                    }
                }
            }

        case types.AUTH_REG_ERROR:
            console.log('AUTH_REG_ERROR');
            return {
                ...state,
                forms: {
                    ...state.forms,
                    register: {
                        ...state.forms.register,
                        errors: {
                            ...state.forms.register.errors,
                            main: action.payload.errorMessage
                        }
                    }
                }
            }

        case types.AUTH_REG_SUCCESS:
            console.log('AUTH_REG_SUCCESS');
            return {
                ...state,
                forms: {
                    ...state.forms,
                    register: {
                        ...state.forms.register,
                        errors: {
                            ...state.forms.register.errors,
                            main: ''
                        },
                        success: true
                    }
                }
            }


        default: return state;
    }
}