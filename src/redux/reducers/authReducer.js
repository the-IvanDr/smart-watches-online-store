import * as types from '../types.js';

const initialState = {
    userId: null,
    jwtToken: null,
    basket: [],
    desires: [],
    orders: []
};

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {          
            
        default: return state;
    }
}