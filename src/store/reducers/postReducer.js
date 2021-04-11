import * as types from '../types.js';

const initialState = {
    posts: [],
    post: {},
    laoding: false,
    error: null
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_POSTS:
            console.log('GET_POSTS');
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            }
            
        default: return state;
    }
}