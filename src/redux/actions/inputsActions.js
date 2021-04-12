import * as types from '../types.js';

export const RegChangeHandler = (event) => {
    return {
        type: types.INPUTS_REG_CHANGE,
        payload: {
            name: event.target.name,
            value: event.target.value
        }
    }
}

export const LogChangeHandler = (event) => {
    return {
        type: types.INPUTS_LOG_CHANGE,
        payload: {
            name: event.target.name,
            value: event.target.value
        }
    }
}