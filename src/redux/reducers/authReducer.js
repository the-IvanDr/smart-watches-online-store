import * as types from '../types.js';

const isBrowser = typeof window !== 'undefined';

const initialState = {
    authData: {
        token: isBrowser ? localStorage.getItem('token') : null,
        fullName: isBrowser ? JSON.parse(localStorage.getItem('fullName')) : {
            fName: '',
            lName: '',
            mName: ''
        },
        email: isBrowser ? localStorage.getItem('email') : '',
        role: isBrowser ? localStorage.getItem('role') : '',

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
            email: 'driga.ya27@gmail.com',
            password: 'LhsueyDfYbZf123123123$$$',
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
            return INPUTS_REG_CHANGE_Handler(state, action);

        case types.INPUTS_LOG_CHANGE:
            return INPUTS_LOG_CHANGE_Handler(state, action);

        case types.AUTH_INVALID_REG_INPUT:
            return INVALID_REG_Handler(state, action);

        case types.AUTH_INVALID_LOG_INPUT:
            return INVALID_LOG_Handler(state, action);

        case types.AUTH_REG_ERROR:
            return AUTH_REG_ERROR_Handler(state, action);

        case types.AUTH_LOG_ERROR:
            return AUTH_LOG_ERROR_Handler(state, action);

        case types.AUTH_REG_SUCCESS:
            return AUTH_REG_SUCCESS_Handler(state, action);

        case types.AUTH_LOG_SUCCESS:
            return AUTH_LOG_SUCCESS_Handler(state, action);

        case types.AUTH_LOGOUT:
            return AUTH_LOGOUT_Handler(state);



        default: return state;
    }
}


const INPUTS_REG_CHANGE_Handler = (state, action) => {
    console.log('INPUTS_REG_CHANGE:', action);

    const FIELD_NAME = action.payload.name;
    const FIELD_VALUE = action.payload.value;

    return {
        authData: state.authData,

        forms: {
            login: state.forms.login,
            register: {
                ...state.forms.register,
                [FIELD_NAME]: FIELD_VALUE,
                errors: {
                    ...state.forms.register.errors,
                    [FIELD_NAME]: ''
                }
            }

        }
    }
}

const INPUTS_LOG_CHANGE_Handler = (state, action) => {
    console.log('INPUTS_LOG_CHANGE');

    const FIELD_NAME = action.payload.name;
    const FIELD_VALUE = action.payload.value;

    return {
        authData: state.authData,

        forms: {
            register: state.forms.register,
            login: {
                ...state.forms.login,
                [FIELD_NAME]: FIELD_VALUE,
                errors: {
                    ...state.forms.login.errors,
                    [FIELD_NAME]: ''
                }
            }

        }
    }
}

const INVALID_REG_Handler = (state, action) => {
    console.log('AUTH_INVALID_REG_INPUT');

    const ERRORS = action.payload.errors;

    return {
        ...state,
        forms: {
            ...state.forms,
            register: {
                ...state.forms.register,
                errors: ERRORS
            }
        }
    }
}

const INVALID_LOG_Handler = (state, action) => {
    console.log('AUTH_INVALID_LOG_INPUT');

    const ERRORS = action.payload.errors;

    return {
        ...state,
        forms: {
            ...state.forms,
            login: {
                ...state.forms.login,
                errors: ERRORS
            }
        }
    }
}

const AUTH_REG_ERROR_Handler = (state, action) => {
    console.log('AUTH_REG_ERROR');

    const ERROR_MESSAGE = action.payload.errorMessage;

    return {
        ...state,
        forms: {
            ...state.forms,
            register: {
                ...state.forms.register,
                errors: {
                    ...state.forms.register.errors,
                    main: ERROR_MESSAGE
                }
            }
        }
    }
}

const AUTH_LOG_ERROR_Handler = (state, action) => {
    console.log("AUTH_LOG_ERROR");

    const ERROR_MESSAGE = action.payload.errorMessage;

    return {
        ...state,
        forms: {
            ...state.forms,
            login: {
                ...state.forms.login,
                errors: {
                    ...state.forms.login.errors,
                    main: ERROR_MESSAGE
                }
            }
        }
    }
}

const AUTH_REG_SUCCESS_Handler = (state, action) => {
    console.log('AUTH_REG_SUCCESS');

    const TOKEN = action.payload.token;
    const EMAIL = action.payload.userData.email;
    const ROLE = action.payload.userData.role;
    const FULL_NAME = {
        fName: action.payload.userData.fName,
        lName: action.payload.userData.lName,
        mName: action.payload.userData.mName
    };

    localStorage.setItem('token', TOKEN);
    localStorage.setItem('fullName', JSON.stringify(FULL_NAME));
    localStorage.setItem('email', EMAIL);
    localStorage.setItem('role', ROLE);

    return {
        authData: {
            ...state.authData,
            token: TOKEN,
            fullName: FULL_NAME,
            email: EMAIL,
            role: ROLE
        },

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
}

const AUTH_LOG_SUCCESS_Handler = (state, action) => {
    console.log('AUTH_LOG_SUCCESS');

    const TOKEN = action.payload.token;
    const EMAIL = action.payload.userData.email;
    const ROLE = action.payload.userData.role;
    const FULL_NAME = {
        fName: action.payload.userData.fName,
        lName: action.payload.userData.lName,
        mName: action.payload.userData.mName
    };

    localStorage.setItem('token', TOKEN);
    localStorage.setItem('email', EMAIL);
    localStorage.setItem('role', ROLE);
    localStorage.setItem('fullName', JSON.stringify(FULL_NAME));

    return {
        authData: {
            ...state.authData,
            token: TOKEN,
            fullName: FULL_NAME,
            email: EMAIL,
            role: ROLE
        },

        forms: {
            ...state.forms,
            login: {
                ...state.forms.login,
                errors: {
                    ...state.forms.login.errors,
                    main: ''
                },
                success: true
            }
        }
    }
}

const AUTH_LOGOUT_Handler = (state) => {
    console.log('AUTH_LOGOUT');

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');

    return {
        authData: {
            ...state.authData,
            token: null,
            email: null,
            role: null,
            fullName: {
                fName: null,
                lName: null,
                mName: null
            }
        },

        forms: {
            login: {
                ...state.forms.login,
                success: false
            },
            register: {
                ...state.forms.register,
                success: false
            }
        }
    }
}